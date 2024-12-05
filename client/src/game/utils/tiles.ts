export function tileToPosition(
  tile: number,
  ratio: number,
  pixelPerTile: number,
): number {
  return tile * (ratio * pixelPerTile) + pixelPerTile / 2;
}
