# WFRP4e Night Vision

Automates the **Night Vision** talent for Warhammer Fantasy Roleplay 4th Edition in Foundry VTT.

## What It Does

Tokens with the Night Vision talent/trait see extended dim light radius from all light sources. The effect stacks with multiple ranks.

## Installation

1. In Foundry VTT, go to **Add-on Modules** → **Install Module**
2. Paste this manifest URL:
   ```
   https://github.com/yurifrl/fvtt-wfrp4e-night-vision/releases/latest/download/module.json
   ```
3. Click **Install**
4. Enable the module in your world

## Configuration

**Configure Settings** → **Module Settings** → **Night Vision (WFRP4e)**

| Setting | Description | Default |
|---------|-------------|---------|
| **Night Vision range** | Meters per rank | 20 |
| **Requires selection** | Players must select a token to see the effect | Off |
| **Affects bright illumination** | Also increases bright light radius (by half) | Off |

## Features

- **Per-rank stacking**: Multiple ranks increase the effect
- **Per-scene toggle**: Disable on specific scenes (e.g., magical darkness)
- **Per-light toggle**: Exclude specific lights from enhancement
- **GM mode**: When "requires selection" is on, GMs see the worst Night Vision among selected tokens
- **Player mode**: Players see the best Night Vision among their owned tokens

## Limitations

**Does not grant vision in total darkness.** Only enhances existing light sources.

**Workaround for starlight/moonlight:** Set token's **Sight Range** to 20 meters in token configuration.

## Compatibility

- **Foundry VTT**: v12+ (verified on v13)
- **System**: WFRP4e

## Credits

- Original module by [TheFirst05](https://github.com/TheFirst05/fvtt-wfrp4e-night-vision)
- Fork by [yurifrl](https://github.com/yurifrl)

## License

GPL-3.0
