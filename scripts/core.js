// Core logic extracted for testing
// This file contains the pure functions that can be unit tested

/**
 * Get darkvision range from token's detection modes
 * Supports both "darkvision" (v12+) and "basicSight" (older) IDs
 * @param {Array} detectionModes - Token's detection modes array
 * @returns {number}
 */
export function getDarkvisionFromModes(detectionModes) {
  const dvMode = detectionModes.find(m => m.id === "darkvision" || m.id === "basicSight");
  return (dvMode?.enabled && dvMode?.range) ? dvMode.range : 0;
}

/**
 * Calculate multiplier from darkvision value (normalized to 60ft = 1x)
 * @param {number} darkvision
 * @returns {number}
 */
export function darkvisionToMultiplier(darkvision) {
  return darkvision > 0 ? darkvision / 60 : 0;
}

/**
 * Calculate darkvision radius adjustment
 * @param {Object} params
 * @param {number} params.dim - Current dim light radius
 * @param {number} params.bright - Current bright light radius
 * @param {Array} params.relevantTokens - Tokens to consider for darkvision
 * @param {boolean} params.useMinimum - If true, use minimum multiplier (GM mode), else maximum
 * @param {number} params.nightVisionDistance - Distance setting (meters per 60ft)
 * @param {number} params.distancePixels - Scene distance pixels
 * @param {boolean} params.nightVisionBright - Whether darkvision affects bright
 * @param {boolean} params.sceneDisabled - Whether darkvision is disabled on scene
 * @param {boolean} params.lightDisabled - Whether darkvision is disabled on this light
 * @param {Function} params.getDarkvision - Function to get darkvision from token
 * @returns {{ dim: number, bright: number }}
 */
export function calculateDarkvisionRadius({
  dim,
  bright,
  relevantTokens,
  useMinimum,
  nightVisionDistance,
  distancePixels,
  nightVisionBright,
  sceneDisabled,
  lightDisabled,
  getDarkvision
}) {
  const result = { dim, bright };

  if (lightDisabled) return result;

  let multiplier = { dim: 0, bright: 0 };

  if (useMinimum && relevantTokens.length) {
    multiplier = { dim: 999, bright: 999 };
    for (const t of relevantTokens) {
      const darkvision = getDarkvision(t);
      const dvMultiplier = darkvisionToMultiplier(darkvision);
      multiplier.dim = Math.min(multiplier.dim, dvMultiplier);
      multiplier.bright = Math.min(multiplier.bright, dvMultiplier);
    }
  } else {
    for (const t of relevantTokens) {
      const darkvision = getDarkvision(t);
      const dvMultiplier = darkvisionToMultiplier(darkvision);
      multiplier.dim = Math.max(multiplier.dim, dvMultiplier);
      multiplier.bright = Math.max(multiplier.bright, dvMultiplier);
    }
  }

  if (!sceneDisabled) {
    result.dim += multiplier.dim * nightVisionDistance * distancePixels;

    if (nightVisionBright) {
      result.bright += multiplier.bright * nightVisionDistance / 2 * distancePixels;
    }
  }

  return result;
}
