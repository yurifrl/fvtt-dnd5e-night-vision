# D&D 5e Darkvision

Automates **Darkvision** for D&D 5th Edition in Foundry VTT.

## How It Works

Tokens with Darkvision see extended dim light radius from all light sources. The module reads darkvision range from the token's Detection Modes and scales accordingly (60ft = 1x, 120ft = 2x).

## Quick Setup Guide

**Goal:** Small darkvision area in darkness + lights extend further for darkvision users.

### 1. Token Configuration

Open your token → **Vision** tab:

| Setting | Value | Why |
|---------|-------|-----|
| **Vision Enabled** | ✓ | Required for vision |
| **Vision Range** | `2` | See only 2 units in total darkness |
| **Vision Mode** | `Basic Vision` | No grey effect (or `Darkvision` for grey) |
| **Detection Modes → basicSight** | Range: `60`, Enabled: ✓ | 60ft darkvision |

### 2. Module Settings

**Configure Settings** → **Module Settings** → **Night Vision (D&D 5e)**

| Setting | Recommended | Description |
|---------|-------------|-------------|
| **Darkvision range** | `20` | Meters of light extension per 60ft darkvision |
| **Requires selection** | Off | Always active for owned tokens |
| **Affects bright illumination** | Off | Only extend dim light |

### 3. Result

- Token sees 2 units in pure darkness
- Light sources extend their dim radius based on darkvision
- 60ft darkvision = lights reach 20m further

## How To Use

1. Enable the module in your D&D 5e world
2. Configure your tokens as shown above
3. Place light sources on your scene
4. Tokens with darkvision will see further into the dim light

## Configuration

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
