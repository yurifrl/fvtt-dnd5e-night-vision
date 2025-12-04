# WFRP4e Night Vision

Automates the **Night Vision** talent for Warhammer Fantasy Roleplay 4th Edition in Foundry VTT.

## What It Does

Tokens with the Night Vision talent/trait see extended dim light radius from all light sources. The effect stacks with multiple ranks of the talent.

**Rules Reference (WFRP4e Core, p.141):**
> *"You can see very well in natural darkness. Assuming you have at least a faint source of light, you can see clearly for 20 yards per rank of Night Vision you possess."*

## Installation

### Via Manifest URL (Recommended)

1. In Foundry VTT, go to **Add-on Modules** → **Install Module**
2. Paste this manifest URL:
   ```
   https://github.com/yurifrl/fvtt-wfrp4e-night-vision/releases/latest/download/module.json
   ```
3. Click **Install**
4. Enable the module in your world's module settings

### Manual Installation

1. Download the latest `module.zip` from [Releases](https://github.com/yurifrl/fvtt-wfrp4e-night-vision/releases)
2. Extract to `Data/modules/wfrp4e-night-vision/`
3. Enable in Foundry

## Configuration

Go to **Configure Settings** → **Module Settings** → **Night Vision (WFRP4e)**

| Setting | Description | Default |
|---------|-------------|---------|
| **Night Vision range** | Distance per rank in your scene's grid units | 20 |
| **Requires selection** | Players must select a token to see Night Vision effect | Off |
| **Affects bright illumination** | Also increases bright light radius (by half) | Off |

### Using Meters Instead of Yards

The module works with any distance unit configured in your scene. If your scenes use **meters**:

1. Go to module settings
2. Set **Night Vision range** to `18` (since 20 yards ≈ 18 meters)

That's it. The module reads your scene's grid configuration automatically.

## Features

- **Per-rank stacking**: Multiple ranks of Night Vision increase the effect
- **Per-scene toggle**: Disable Night Vision on specific scenes (e.g., magical darkness)
- **Per-light toggle**: Exclude specific lights from Night Vision enhancement
- **GM mode**: When "requires selection" is on, GMs see the *worst* Night Vision among selected tokens
- **Player mode**: Players see the *best* Night Vision among their owned tokens

## Limitations

**Does not grant vision in total darkness.** Night Vision only enhances *existing* light sources. If there's no light at all, tokens won't see.

**Workaround for starlight/moonlight:** Give tokens base vision range:
1. Open token configuration → Vision tab
2. Set **Sight Range** to 20 yards (or 18 meters)

Or use a macro to apply this to all tokens with Night Vision.

## Per-Scene / Per-Light Options

### Disable on a Scene
1. Open Scene Configuration
2. Find "Disable Night Vision" checkbox (under lighting settings)
3. Check to disable Night Vision effects on that scene

### Disable on a Light Source
1. Open Ambient Light or Token Light configuration
2. Go to **Advanced** tab
3. Check "Disable Night Vision" to exclude that light

## Compatibility

- **Foundry VTT**: v12+ (verified on v13)
- **System**: WFRP4e

## Credits

- Original module by [TheFirst05](https://github.com/TheFirst05/fvtt-wfrp4e-night-vision)
- Fork maintained by [yurifrl](https://github.com/yurifrl)

## License

GPL-3.0
