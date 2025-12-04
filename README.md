# D&D 5e Darkvision

Automates **Darkvision** for D&D 5th Edition in Foundry VTT.

## What It Does

Tokens with Darkvision see extended dim light radius from all light sources. Scales with darkvision range (60ft, 120ft, etc).

## Installation

1. In Foundry VTT, go to **Add-on Modules** → **Install Module**
2. Paste this manifest URL:
   ```
   https://github.com/yurifrl/fvtt-dnd5e-night-vision/releases/latest/download/module.json
   ```
3. Click **Install**
4. Enable the module in your world

## Configuration

**Configure Settings** → **Module Settings** → **Night Vision (D&D 5e)**

| Setting | Description | Default |
|---------|-------------|---------|
| **Darkvision range** | Meters per 60ft of Darkvision | 20 |
| **Requires selection** | Players must select a token to see the effect | Off |
| **Affects bright illumination** | Also increases bright light radius (by half) | Off |

## Features

- **Scales with Darkvision range**: 120ft darkvision = 2x effect
- **Per-scene toggle**: Disable on specific scenes
- **Per-light toggle**: Exclude specific lights from enhancement
- **GM mode**: GMs see worst Darkvision among selected tokens
- **Player mode**: Players see best Darkvision among owned tokens

## Limitations

**Does not grant vision in total darkness.** Only enhances existing light sources.

## Compatibility

- **Foundry VTT**: v12+ (verified on v13)
- **System**: D&D 5e

## License

GPL-3.0
