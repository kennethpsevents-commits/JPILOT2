# Face Cropping Script - Gebruiksaanwijzing

## Wat doet dit script?

Dit Python script detecteert automatisch gezichten in foto's en knipt ze bij met:
- **1 cm extra ruimte boven het hoofd** (of 5% van beeldhoogte als DPI niet beschikbaar)
- Volledige gezichten zichtbaar (geen afgesneden hoofden)
- Extra padding rondom voor professionele framing

## Installatie

\`\`\`bash
# Installeer vereiste packages
pip install face_recognition pillow opencv-python
\`\`\`

**Let op:** `face_recognition` vereist `dlib`, wat soms moeilijk te installeren is op Windows.
Alternatief: gebruik een Docker container of Linux/Mac.

## Gebruik

\`\`\`bash
# Basis gebruik
python scripts/crop_faces_with_space.py input_folder output_folder

# Voorbeeld
python scripts/crop_faces_with_space.py ./original_photos ./cropped_photos
\`\`\`

## Wat gebeurt er?

1. Script scant alle afbeeldingen in de input folder
2. Detecteert alle gezichten per afbeelding
3. Berekent 1cm in pixels (of gebruikt 5% van hoogte)
4. Knipt elke foto bij met extra ruimte boven hoofd
5. Slaat resultaten op in output folder

## Output

Voor elke gedetecteerde gezicht krijg je:
- `originele_naam_face_1.jpg`
- `originele_naam_face_2.jpg` (als meerdere gezichten)

## Tips

- Gebruik hoge resolutie foto's voor beste resultaten
- Script werkt met JPG, PNG, WEBP formaten
- Bij meerdere gezichten in één foto krijg je meerdere crops
- Kwaliteit wordt behouden (95% JPEG quality)

## Troubleshooting

**"No faces detected"**: Foto is te donker, gezicht te klein, of niet frontaal
**"Error installing dlib"**: Gebruik Docker of pre-built wheels
**"Module not found"**: Run `pip install -r requirements.txt` eerst
