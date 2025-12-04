# D&D 5e Darkvision

Automates **Darkvision** for D&D 5th Edition in Foundry VTT.

## How It Works

Tokens with Darkvision see extended dim light radius from all light sources. The module reads darkvision range from the actor's senses and scales accordingly (60ft = 1x, 120ft = 2x).

## How To Use

1. Enable the module in your D&D 5e world
2. Make sure your tokens have Darkvision set in their actor sheet (Features → Senses)
3. That's it - dim light from all sources automatically extends for those tokens

## Configuration

**Configure Settings** → **Module Settings** → **Night Vision (D&D 5e)**

| Setting | Description | Default |
|---------|-------------|---------|
| **Darkvision range** | Meters per 60ft of Darkvision | 20 |
| **Requires selection** | Players must select a token to see the effect | Off |
| **Affects bright illumination** | Also increases bright light radius (by half) | Off |

### Per-Scene / Per-Light Disable

- **Scene**: Open Scene Config → check "Disable Darkvision"
- **Light**: Open Light Config → Advanced → check "Disable Darkvision"

## Limitations

**Does not grant vision in total darkness.** Only enhances existing light sources.

## Installation

1. In Foundry VTT: **Add-on Modules** → **Install Module**
2. Paste manifest URL:
   ```
   https://github.com/yurifrl/fvtt-dnd5e-night-vision/releases/latest/download/module.json
   ```
3. Install and enable in your world

## License

GPL-3.0
