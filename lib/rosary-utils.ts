// Define the rosary layout positions
export const getRosaryElementPosition = (id: string): { top: string; left: string } => {
  const positions: Record<string, { top: string; left: string }> = {
    // Cross at the bottom (moved from top)
    "✝": { top: "95%", left: "50%" },

    // Stem beads leading up from cross
    S1: { top: "85%", left: "50%" },
    S2: { top: "75%", left: "50%" },
    S3: { top: "65%", left: "50%" },
    S4: { top: "55%", left: "50%" },

    // Main rosary circle - starting from top and going clockwise
    M1: { top: "15%", left: "50%" }, // Top center
    "H1-1": { top: "18%", left: "58%" },
    "H1-2": { top: "22%", left: "65%" },
    "H1-3": { top: "27%", left: "71%" },
    "H1-4": { top: "33%", left: "76%" },
    "H1-5": { top: "39%", left: "80%" },
    "H1-6": { top: "45%", left: "82%" },
    "H1-7": { top: "51%", left: "83%" },
    "H1-8": { top: "57%", left: "82%" },
    "H1-9": { top: "63%", left: "80%" },
    "H1-10": { top: "68%", left: "76%" },

    M2: { top: "73%", left: "71%" }, // Right side
    "H2-1": { top: "76%", left: "65%" },
    "H2-2": { top: "78%", left: "58%" },
    "H2-3": { top: "79%", left: "50%" },
    "H2-4": { top: "78%", left: "42%" },
    "H2-5": { top: "76%", left: "35%" },
    "H2-6": { top: "73%", left: "29%" },
    "H2-7": { top: "68%", left: "24%" },
    "H2-8": { top: "63%", left: "20%" },
    "H2-9": { top: "57%", left: "18%" },
    "H2-10": { top: "51%", left: "17%" },

    M3: { top: "45%", left: "18%" }, // Left side
    "H3-1": { top: "39%", left: "20%" },
    "H3-2": { top: "33%", left: "24%" },
    "H3-3": { top: "27%", left: "29%" },
    "H3-4": { top: "22%", left: "35%" },
    "H3-5": { top: "18%", left: "42%" },
    "H3-6": { top: "17%", left: "50%" },
    "H3-7": { top: "18%", left: "58%" },
    "H3-8": { top: "22%", left: "65%" },
    "H3-9": { top: "27%", left: "71%" },
    "H3-10": { top: "33%", left: "76%" },

    M4: { top: "39%", left: "80%" },
    "H4-1": { top: "45%", left: "82%" },
    "H4-2": { top: "51%", left: "83%" },
    "H4-3": { top: "57%", left: "82%" },
    "H4-4": { top: "63%", left: "80%" },
    "H4-5": { top: "68%", left: "76%" },
    "H4-6": { top: "73%", left: "71%" },
    "H4-7": { top: "76%", left: "65%" },
    "H4-8": { top: "78%", left: "58%" },
    "H4-9": { top: "79%", left: "50%" },
    "H4-10": { top: "78%", left: "42%" },

    M5: { top: "76%", left: "35%" },
    "H5-1": { top: "73%", left: "29%" },
    "H5-2": { top: "68%", left: "24%" },
    "H5-3": { top: "63%", left: "20%" },
    "H5-4": { top: "57%", left: "18%" },
    "H5-5": { top: "51%", left: "17%" },
    "H5-6": { top: "45%", left: "18%" },
    "H5-7": { top: "39%", left: "20%" },
    "H5-8": { top: "33%", left: "24%" },
    "H5-9": { top: "27%", left: "29%" },
    "H5-10": { top: "22%", left: "35%" },

    // Final prayers
    "M1/Final": { top: "45%", left: "50%" }, // Center
  }

  return positions[id] || { top: "50%", left: "50%" }
}

// Define connections between rosary elements
export const rosaryConnections: [string, string][] = [
  // Cross to stem
  ["✝", "S1"],
  ["S1", "S2"],
  ["S2", "S3"],
  ["S3", "S4"],

  // Stem to main circle
  ["S4", "M1"],

  // First decade
  ["M1", "H1-1"],
  ["H1-1", "H1-2"],
  ["H1-2", "H1-3"],
  ["H1-3", "H1-4"],
  ["H1-4", "H1-5"],
  ["H1-5", "H1-6"],
  ["H1-6", "H1-7"],
  ["H1-7", "H1-8"],
  ["H1-8", "H1-9"],
  ["H1-9", "H1-10"],
  ["H1-10", "M2"],

  // Second decade
  ["M2", "H2-1"],
  ["H2-1", "H2-2"],
  ["H2-2", "H2-3"],
  ["H2-3", "H2-4"],
  ["H2-4", "H2-5"],
  ["H2-5", "H2-6"],
  ["H2-6", "H2-7"],
  ["H2-7", "H2-8"],
  ["H2-8", "H2-9"],
  ["H2-9", "H2-10"],
  ["H2-10", "M3"],

  // Third decade
  ["M3", "H3-1"],
  ["H3-1", "H3-2"],
  ["H3-2", "H3-3"],
  ["H3-3", "H3-4"],
  ["H3-4", "H3-5"],
  ["H3-5", "H3-6"],
  ["H3-6", "H3-7"],
  ["H3-7", "H3-8"],
  ["H3-8", "H3-9"],
  ["H3-9", "H3-10"],
  ["H3-10", "M4"],

  // Fourth decade
  ["M4", "H4-1"],
  ["H4-1", "H4-2"],
  ["H4-2", "H4-3"],
  ["H4-3", "H4-4"],
  ["H4-4", "H4-5"],
  ["H4-5", "H4-6"],
  ["H4-6", "H4-7"],
  ["H4-7", "H4-8"],
  ["H4-8", "H4-9"],
  ["H4-9", "H4-10"],
  ["H4-10", "M5"],

  // Fifth decade
  ["M5", "H5-1"],
  ["H5-1", "H5-2"],
  ["H5-2", "H5-3"],
  ["H5-3", "H5-4"],
  ["H5-4", "H5-5"],
  ["H5-5", "H5-6"],
  ["H5-6", "H5-7"],
  ["H5-7", "H5-8"],
  ["H5-8", "H5-9"],
  ["H5-9", "H5-10"],
  ["H5-10", "M1"], // Complete the circle back to first mystery
]
