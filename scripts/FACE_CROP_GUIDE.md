# Face Cropping Guide - 1cm Space Above Head

## Quick Start (Nederlands)

### Korte Prompt voor Image Tools:
\`\`\`
Detecteer alle gezichten in elke afbeelding. Zorg dat elk gezicht volledig 
zichtbaar blijft in de crop. Bijsnijden zó dat er ongeveer 1 cm ruimte boven 
het hoofd overblijft (als absolute cm niet beschikbaar is: gebruik 5% van de 
beeldhoogte boven de gezichtsbovenkant). Centraal frameer het gezicht; behoud 
zoveel mogelijk van de originele beeldverhouding.
\`\`\`

### Gedetailleerde Prompt:
\`\`\`
Stap 1: Voer gezichtsdetectie uit op elke afbeelding en bepaal voor elk 
gezicht een bounding box (x, y, w, h).

Stap 2: Vergroot de bounding box aan de bovenzijde met 1 cm om extra ruimte 
boven het hoofd te bewaren. Als de service alleen pixels accepteert: 
converteer 1 cm naar pixels met DPI = image.dpi (px_per_cm = dpi / 2.54). 
Als DPI niet beschikbaar is, gebruik 5% van de image height als bovenzone.

Stap 3: Zorg dat de aangepaste box het volledige gezicht bevat en binnen de 
afbeeldinggrenzen blijft.

Stap 4: Behoud de aspect ratio zo veel mogelijk; prefer crop die het gezicht 
volledig toont (geen head-cutting).
\`\`\`

## Using the Python Script

### Installation:
\`\`\`bash
pip install face_recognition pillow opencv-python
\`\`\`

### Usage:

**Single Image:**
\`\`\`bash
python scripts/advanced_face_crop.py path/to/image.jpg
\`\`\`

**Entire Directory:**
\`\`\`bash
python scripts/advanced_face_crop.py path/to/images/
\`\`\`

**Custom Space (1.5cm instead of 1cm):**
\`\`\`bash
python scripts/advanced_face_crop.py image.jpg 1.5
\`\`\`

### Output:
- Cropped images saved to `cropped/` directory
- Named as `originalname_face_0.jpg`, `originalname_face_1.jpg`, etc.
- High quality (95% JPEG quality)

## Technical Details

### 1cm → Pixels Conversion:

**With DPI:**
\`\`\`
px_per_cm = dpi / 2.54
extra_pixels = round(px_per_cm * 1.0)
\`\`\`

**Without DPI (fallback):**
\`\`\`
extra_pixels = round(image_height * 0.05)  # 5% of height
\`\`\`

**Reference:**
- 72 DPI → ~28 pixels per cm
- 300 DPI → ~118 pixels per cm

### Padding Applied:
- **Top:** 1cm (or specified) above detected face
- **Sides:** 20% of face width
- **Bottom:** 15% of face height

## For Web/Node.js Implementation

\`\`\`javascript
const sharp = require('sharp');

async function cropWithExtra(imgPath, faces) {
  const meta = await sharp(imgPath).metadata();
  const extra_px = meta.density 
    ? Math.round(meta.density / 2.54) 
    : Math.round(meta.height * 0.05);
  
  for (let i = 0; i < faces.length; i++) {
    const f = faces[i];
    const top = Math.max(0, f.top - extra_px);
    const left = Math.max(0, f.left - Math.round(f.width * 0.1));
    const width = Math.min(meta.width - left, f.width + Math.round(f.width * 0.2));
    const height = Math.min(meta.height - top, f.height + Math.round(f.height * 0.2));
    
    await sharp(imgPath)
      .extract({ left, top, width, height })
      .toFile(`crop_${i}.jpg`);
  }
}
\`\`\`

## Troubleshooting

**No faces detected:**
- Ensure faces are clearly visible and well-lit
- Try using 'cnn' model instead of 'hog' (requires more resources)
- Check if image is too low resolution

**Faces cut off:**
- Increase cm_above parameter (try 1.5 or 2.0)
- Adjust padding percentages in the script

**Performance issues:**
- Use 'hog' model for faster processing
- Process images in smaller batches
- Reduce image resolution before processing

## Best Practices for Customer Support Images

1. **Lighting:** Ensure even, bright lighting on faces
2. **Resolution:** Use at least 1200px width for best results
3. **Composition:** Leave natural space around subjects
4. **Expression:** Capture genuine smiles and friendly expressions
5. **Background:** Use clean, professional office environments
6. **Equipment:** Show headsets, computers, office setting
7. **Team shots:** Include multiple people for collaborative feel
