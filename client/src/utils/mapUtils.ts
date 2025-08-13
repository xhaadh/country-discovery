// Utility functions for map operations
export const getMapBounds = (positions: [number, number][]): [[number, number], [number, number]] => {
  if (positions.length === 0) {
    return [
      [0, 0],
      [0, 0]
    ];
  }

  let minLat = positions[0][0];
  let maxLat = positions[0][0];
  let minLng = positions[0][1];
  let maxLng = positions[0][1];

  positions.forEach(([lat, lng]) => {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  });

  // Add padding to the bounds
  const padding = 1;
  return [
    [minLat - padding, minLng - padding],
    [maxLat + padding, maxLng + padding]
  ];
};

export const calculateMapCenter = (positions: [number, number][]): [number, number] => {
  if (positions.length === 0) return [0, 0];
  
  const sum = positions.reduce(
    (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng],
    [0, 0]
  );
  
  return [sum[0] / positions.length, sum[1] / positions.length];
};