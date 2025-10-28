"""
Face Detection and Cropping Script
Ensures faces are fully visible with 1cm space above head
Usage: python scripts/crop_faces_with_space.py input_folder output_folder
"""

# Vereisten: pip install face_recognition pillow opencv-python
from PIL import Image
import face_recognition
import os
import sys
from pathlib import Path

def px_for_cm(img, cm=1):
    """Convert cm to pixels based on DPI, fallback to 5% of height"""
    dpi = img.info.get("dpi", (72, 72))[1]  # (x,y) tuple, take y
    if dpi and dpi > 0:
        return round(dpi / 2.54 * cm)
    return round(img.height * 0.05)  # fallback: 5% of height

def crop_faces_keep_space(path_in, output_dir, filename):
    """
    Detect faces and crop with extra space above head
    Saves individual crops for each detected face
    """
    try:
        img = Image.open(path_in)
        img_arr = face_recognition.load_image_file(path_in)
        locations = face_recognition.face_locations(img_arr, model="hog")
        
        if not locations:
            print(f"⚠️  No faces detected in {filename}")
            return
        
        extra_px = px_for_cm(img, 1)
        print(f"📏 Using {extra_px}px extra space above head for {filename}")
        
        for i, (top, right, bottom, left) in enumerate(locations):
            # Add extra space above head (1cm)
            new_top = max(0, top - extra_px)
            
            # Add padding on sides and bottom for better framing
            pad_w = int((right - left) * 0.2)  # 20% width padding
            pad_h = int((bottom - new_top) * 0.15)  # 15% height padding
            
            new_left = max(0, left - pad_w)
            new_right = min(img.width, right + pad_w)
            new_bottom = min(img.height, bottom + pad_h)
            
            # Crop the image
            cropped = img.crop((new_left, new_top, new_right, new_bottom))
            
            # Save with descriptive name
            base_name = Path(filename).stem
            output_path = os.path.join(output_dir, f"{base_name}_face_{i+1}.jpg")
            cropped.save(output_path, quality=95)
            print(f"✅ Saved: {output_path}")
            
    except Exception as e:
        print(f"❌ Error processing {filename}: {str(e)}")

def process_folder(input_folder, output_folder):
    """Process all images in input folder"""
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Supported image formats
    extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    # Process all images
    image_files = [f for f in os.listdir(input_folder) 
                   if f.lower().endswith(extensions)]
    
    if not image_files:
        print(f"❌ No images found in {input_folder}")
        return
    
    print(f"🔍 Found {len(image_files)} images to process\n")
    
    for filename in image_files:
        input_path = os.path.join(input_folder, filename)
        print(f"Processing: {filename}")
        crop_faces_keep_space(input_path, output_folder, filename)
        print()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python crop_faces_with_space.py <input_folder> <output_folder>")
        print("Example: python crop_faces_with_space.py ./original_images ./cropped_images")
        sys.exit(1)
    
    input_folder = sys.argv[1]
    output_folder = sys.argv[2]
    
    if not os.path.exists(input_folder):
        print(f"❌ Input folder not found: {input_folder}")
        sys.exit(1)
    
    print("=" * 60)
    print("Face Detection & Cropping Tool")
    print("=" * 60)
    print(f"Input:  {input_folder}")
    print(f"Output: {output_folder}")
    print("=" * 60)
    print()
    
    process_folder(input_folder, output_folder)
    
    print("=" * 60)
    print("✨ Processing complete!")
    print("=" * 60)
