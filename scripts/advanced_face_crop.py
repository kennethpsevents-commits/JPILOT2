"""
Advanced Face Cropping Tool with 1cm Space Above Head
Based on technical specifications for proper face framing
"""
# Vereisten: pip install face_recognition pillow opencv-python

from PIL import Image
import face_recognition
import math
import os
from pathlib import Path

def px_for_cm(img, cm=1):
    """
    Convert cm to pixels based on image DPI
    Fallback to 5% of height if DPI unavailable
    """
    dpi = img.info.get("dpi", (72, 72))[1]  # (x,y) tuple, take y
    if dpi and dpi > 0:
        return round(dpi / 2.54 * cm)
    # Fallback: 5% of image height
    return round(img.height * 0.05)

def crop_faces_keep_space(path_in, out_dir="cropped", cm_above=1):
    """
    Detect faces and crop with specified cm space above head
    
    Args:
        path_in: Input image path
        out_dir: Output directory for cropped images
        cm_above: Centimeters of space to keep above head (default 1)
    """
    # Create output directory
    Path(out_dir).mkdir(exist_ok=True)
    
    # Load image
    img = Image.open(path_in)
    img_arr = face_recognition.load_image_file(path_in)
    
    # Detect faces (use 'cnn' for better accuracy if GPU available)
    locations = face_recognition.face_locations(img_arr, model="hog")
    
    if not locations:
        print(f"No faces detected in {path_in}")
        return
    
    # Calculate extra pixels for cm space
    extra_px = px_for_cm(img, cm_above)
    print(f"Using {extra_px}px for {cm_above}cm space above head")
    
    for i, (top, right, bottom, left) in enumerate(locations):
        # Add extra space above head
        new_top = max(0, top - extra_px)
        
        # Add padding to sides and bottom for better framing
        face_width = right - left
        face_height = bottom - new_top
        
        pad_w = int(face_width * 0.2)  # 20% padding on sides
        pad_h = int(face_height * 0.15)  # 15% padding on bottom
        
        new_left = max(0, left - pad_w)
        new_right = min(img.width, right + pad_w)
        new_bottom = min(img.height, bottom + pad_h)
        
        # Crop image
        cropped = img.crop((new_left, new_top, new_right, new_bottom))
        
        # Save with original filename + face index
        base_name = Path(path_in).stem
        out_path = Path(out_dir) / f"{base_name}_face_{i}.jpg"
        cropped.save(out_path, quality=95)
        print(f"Saved: {out_path}")

def batch_crop_directory(input_dir, output_dir="cropped", cm_above=1):
    """
    Process all images in a directory
    """
    input_path = Path(input_dir)
    supported_formats = {'.jpg', '.jpeg', '.png', '.webp'}
    
    for img_file in input_path.iterdir():
        if img_file.suffix.lower() in supported_formats:
            print(f"\nProcessing: {img_file.name}")
            try:
                crop_faces_keep_space(str(img_file), output_dir, cm_above)
            except Exception as e:
                print(f"Error processing {img_file.name}: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  Single image: python advanced_face_crop.py image.jpg")
        print("  Directory: python advanced_face_crop.py /path/to/images/")
        print("  With custom space: python advanced_face_crop.py image.jpg 1.5")
        sys.exit(1)
    
    input_path = sys.argv[1]
    cm_space = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
    
    if os.path.isdir(input_path):
        batch_crop_directory(input_path, cm_above=cm_space)
    else:
        crop_faces_keep_space(input_path, cm_above=cm_space)
