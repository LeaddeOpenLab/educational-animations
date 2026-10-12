export const COURSE = 'Classical Mechanics';
export const CARDS = [
  {
    "id": "cm01-location-time-graph",
    "file": "01_Location_time_graph",
    "knowledgePoint": "Position–Time Graph",
    "task": "Read signed velocity from the slope of a position–time graph.",
    "motionStyle": "marker-travel + tangent rotation + walker reversal",
    "palette": "classical-mechanics-paper",
    "beats": {
      "setup": {
        "copy": [
          "Position links the path and graph"
        ],
        "figure": "walker, position trace"
      },
      "positive-slope": {
        "copy": [
          "v = dx/dt > 0"
        ],
        "figure": "rising x(t), tangent, rise/run triangle"
      },
      "turn-and-stop": {
        "copy": [
          "Horizontal tangent: v = 0"
        ],
        "figure": "turning point, walker, tangent"
      },
      "negative-slope": {
        "copy": [
          "Downhill graph means negative velocity"
        ],
        "figure": "falling x(t), walker, tangent"
      },
      "close": {
        "copy": [
          "Slope, not graph height, gives velocity"
        ],
        "figure": "three tangent snapshots"
      }
    }
  },
  {
    "id": "cm02-speed-time-graph",
    "file": "02_Speed_time_graph",
    "knowledgePoint": "Speed–Time Graph",
    "task": "Read speed changes and calculate distance traveled from the nonnegative area under a speed–time graph.",
    "motionStyle": "area sweep + cart travel",
    "palette": "classical-mechanics-paper",
    "beats": {
      "setup": {
        "copy": [
          "Speed is a magnitude"
        ],
        "figure": "cart, speed–time axes"
      },
      "accelerate": {
        "copy": [
          "Steeper graph: speeding up"
        ],
        "figure": "rising speed curve, cart, slope marker"
      },
      "cruise": {
        "copy": [
          "Flat speed still covers distance"
        ],
        "figure": "flat speed segment, cart, distance area"
      },
      "brake": {
        "copy": [
          "Area = ∫speed dt; Slope changes speed; area gives distance"
        ],
        "figure": "falling speed curve, cart, accumulated area, distance counter, full shaded area"
      }
    }
  },
  {
    "id": "cm03-acceleration-time-graph",
    "file": "03_Acceleration_time_graph",
    "knowledgePoint": "Acceleration–Time Graph",
    "task": "Show that area under acceleration changes velocity and then position.",
    "motionStyle": "signed-area sweep + cart travel",
    "palette": "classical-mechanics-paper",
    "beats": {
      "setup": {
        "copy": [
          "Acceleration changes velocity"
        ],
        "figure": "a(t) graph, cart, v readout"
      },
      "integrate": {
        "copy": [
          "Δv = ∫a dt"
        ],
        "figure": "a(t) shaded area, v readout, cart"
      },
      "zero-a": {
        "copy": [
          "Zero acceleration can mean constant speed"
        ],
        "figure": "zero a line, v readout, cart"
      },
      "negative-a": {
        "copy": [
          "Negative area reduces velocity"
        ],
        "figure": "negative a region, v readout, cart"
      },
      "close": {
        "copy": [
          "Area changes v; v moves x"
        ],
        "figure": "a area, v history"
      }
    }
  },
  {
    "id": "cm04-newtons-laws-of-motion",
    "file": "04_Newtons_laws_of_motion",
    "knowledgePoint": "Newton's Laws of Motion",
    "task": "Connect net force to acceleration and distinguish action–reaction forces on different bodies.",
    "motionStyle": "opposing force arrows + cart acceleration + cross-body pair",
    "palette": "classical-mechanics-paper",
    "beats": {
      "balanced": {
        "copy": [
          "Balanced forces: no acceleration"
        ],
        "figure": "cart, opposing forces"
      },
      "unbalanced": {
        "copy": [
          "Net force changes motion"
        ],
        "figure": "cart, two unequal force arrows, motion ticks"
      },
      "mass": {
        "copy": [
          "a = F/m"
        ],
        "figure": "heavy cart, light cart, same applied force"
      },
      "interaction": {
        "copy": [
          "Third-law pair: different bodies"
        ],
        "figure": "two carts, paired contact arrows"
      },
      "different-bodies": {
        "copy": [
          "Third-law forces belong to different bodies"
        ],
        "figure": "cart A force diagram, cart B force diagram"
      },
      "close": {
        "copy": [
          "Sum forces per body"
        ],
        "figure": "force balance, acceleration"
      }
    }
  },
  {
    "id": "cm05-free-body-diagram",
    "file": "05_Free_body_diagram",
    "knowledgePoint": "Free-Body Diagram",
    "task": "Construct a correct free-body diagram for a block on an incline.",
    "motionStyle": "gravity decomposition + friction arrow",
    "palette": "classical-mechanics-paper",
    "beats": {
      "situation": {
        "copy": [
          "Isolate the block"
        ],
        "figure": "incline, block, Earth/contact"
      },
      "replace-contacts": {
        "copy": [
          "Forces act on the block"
        ],
        "figure": "isolated block, mg, normal"
      },
      "resolve": {
        "copy": [
          "Resolve gravity along slope"
        ],
        "figure": "mg, parallel/perpendicular components, axes"
      },
      "friction-check": {
        "copy": [
          "Friction opposes relative motion; One diagram, one body"
        ],
        "figure": "friction arrow, force sum, completed FBD"
      }
    }
  },
  {
    "id": "cm06-conservation-of-momentum",
    "file": "06_Conservation_of_momentum",
    "knowledgePoint": "Conservation of Momentum",
    "task": "Track individual and total momentum through an isolated two-body interaction.",
    "motionStyle": "collision travel + momentum-bar exchange",
    "palette": "classical-mechanics-paper",
    "beats": {
      "before": {
        "copy": [
          "Measure momentum before"
        ],
        "figure": "two carts, velocity arrows, momentum bars"
      },
      "interaction": {
        "copy": [
          "Internal forces exchange momentum"
        ],
        "figure": "contact pair, force/impulse arrows, bars"
      },
      "after": {
        "copy": [
          "p_before = p_after"
        ],
        "figure": "separating carts, momentum bars"
      },
      "external-force": {
        "copy": [
          "Conservation requires an isolated system; Track the whole system"
        ],
        "figure": "system boundary, outside force, before/after totals"
      }
    }
  },
  {
    "id": "cm07-collision-process",
    "file": "07_Collision_process",
    "knowledgePoint": "Collision Process",
    "task": "Show approach, contact impulse, and separation or sticking rather than only before/after labels.",
    "motionStyle": "approach + compression + rebound + sticking",
    "palette": "classical-mechanics-paper",
    "beats": {
      "approach": {
        "copy": [
          "Before contact"
        ],
        "figure": "two balls, velocity arrows"
      },
      "contact": {
        "copy": [
          "Impulse during contact"
        ],
        "figure": "compressed contact region, impulse arrows, velocity indicators"
      },
      "rebound": {
        "copy": [
          "Elastic: kinetic energy conserved"
        ],
        "figure": "separating balls, energy bars"
      },
      "stick": {
        "copy": [
          "Inelastic: some kinetic energy transforms"
        ],
        "figure": "joined balls, energy bars, heat marker"
      },
      "close": {
        "copy": [
          "Momentum survives both cases"
        ],
        "figure": "elastic/inelastic states"
      }
    }
  },
  {
    "id": "cm08-work-energy-theorem",
    "file": "08_Work_Energy_Theorem",
    "knowledgePoint": "Work–Energy Theorem",
    "task": "Connect force along displacement to accumulated work and kinetic-energy change.",
    "motionStyle": "signed area sweep + kinetic-energy response",
    "palette": "classical-mechanics-paper",
    "beats": {
      "force-and-path": {
        "copy": [
          "Work needs displacement"
        ],
        "figure": "cart, applied force, x markers"
      },
      "work-area": {
        "copy": [
          "W = ∫F dx"
        ],
        "figure": "F(x) graph, swept area, cart"
      },
      "energy": {
        "copy": [
          "W_net = ΔK"
        ],
        "figure": "speed readout, kinetic-energy bar"
      },
      "opposing-force": {
        "copy": [
          "Negative work removes kinetic energy; Force over distance changes K"
        ],
        "figure": "opposite force, negative area, cart, work and ΔK"
      }
    }
  },
  {
    "id": "cm09-potential-energy",
    "file": "09_Potential_energy",
    "knowledgePoint": "Potential Energy",
    "task": "Demonstrate gravitational potential change and the arbitrary reference level.",
    "motionStyle": "reference shift + height travel + energy-bar exchange",
    "palette": "classical-mechanics-paper",
    "beats": {
      "reference": {
        "copy": [
          "Choose a reference"
        ],
        "figure": "mass, height ruler, zero line"
      },
      "lift": {
        "copy": [
          "Lifting stores energy"
        ],
        "figure": "mass, height marker, U bar"
      },
      "change-zero": {
        "copy": [
          "Zero is arbitrary"
        ],
        "figure": "zero line, absolute U labels, ΔU bracket"
      },
      "descent": {
        "copy": [
          "Potential becomes kinetic"
        ],
        "figure": "descending mass, U/K bars"
      },
      "close": {
        "copy": [
          "ΔU, not absolute U"
        ],
        "figure": "two reference choices"
      }
    }
  },
  {
    "id": "cm10-potential-energy-curve",
    "file": "10_Potential_energy_curve",
    "knowledgePoint": "Potential Energy Curve",
    "task": "Read allowed motion, turning points and kinetic energy from U(x) and total E.",
    "motionStyle": "energy-curve marker travel + turning + return",
    "palette": "classical-mechanics-paper",
    "beats": {
      "landscape": {
        "copy": [
          "Compare U with total E"
        ],
        "figure": "U(x) curve, particle, E line"
      },
      "allowed": {
        "copy": [
          "Motion needs K≥0"
        ],
        "figure": "allowed region, forbidden region, particle"
      },
      "turning": {
        "copy": [
          "Turning point: U=E"
        ],
        "figure": "moving particle, turning-point markers"
      },
      "stability": {
        "copy": [
          "Minimum is stable; Read the curve as motion"
        ],
        "figure": "well minimum, small displacement, E and U summary"
      }
    }
  },
  {
    "id": "cm11-rigid-body-rotation",
    "file": "11_Rigid_body_rotation",
    "knowledgePoint": "Rigid-Body Rotation",
    "task": "Relate angular displacement to tangential motion at different radii.",
    "motionStyle": "disk rotation + radial comparison",
    "palette": "classical-mechanics-paper",
    "beats": {
      "axis": {
        "copy": [
          "One fixed axis"
        ],
        "figure": "disk, fixed axis, two radial points"
      },
      "sweep": {
        "copy": [
          "Same Δθ, different arc length"
        ],
        "figure": "rotating disk, angle wedge, point trails"
      },
      "speed": {
        "copy": [
          "v = rω"
        ],
        "figure": "inner/outer motion arrows, ω indicator"
      },
      "torque": {
        "copy": [
          "Torque changes rotation; Radius sets tangential speed"
        ],
        "figure": "tangential force, ω indicator, two radii, speed ratio"
      }
    }
  },
  {
    "id": "cm12-angular-momentum",
    "file": "12_Angular_momentum",
    "knowledgePoint": "Angular Momentum",
    "task": "Show how torque changes L and how mass redistribution changes spin when L is conserved.",
    "motionStyle": "torque impulse + mass redistribution + slower spin",
    "palette": "classical-mechanics-paper",
    "beats": {
      "spin": {
        "copy": [
          "Angular momentum of a rotor"
        ],
        "figure": "rotor, two movable masses, L arrow"
      },
      "torque": {
        "copy": [
          "Torque changes L"
        ],
        "figure": "tangential force, L arrow"
      },
      "release": {
        "copy": [
          "No external torque: L holds"
        ],
        "figure": "rotor, L indicator"
      },
      "redistribute": {
        "copy": [
          "Outward mass slows spin"
        ],
        "figure": "masses moving outward, I and ω readouts"
      },
      "close": {
        "copy": [
          "Same L, different spin rate"
        ],
        "figure": "before/after configurations"
      }
    }
  },
  {
    "id": "cm13-no-slip-scrolling",
    "file": "13_No_slip_scrolling",
    "knowledgePoint": "Rolling Without Slipping",
    "task": "Show the geometric no-slip constraint and the instantaneous rest of the contact point.",
    "motionStyle": "rolling translation + wheel rotation + slip offset",
    "palette": "classical-mechanics-paper",
    "beats": {
      "setup": {
        "copy": [
          "Track translation and rotation"
        ],
        "figure": "wheel, ground, spoke marker"
      },
      "roll": {
        "copy": [
          "No slip: s=rθ"
        ],
        "figure": "wheel, center trail, contact trail"
      },
      "contact": {
        "copy": [
          "Contact point is instantaneously still"
        ],
        "figure": "ground contact point, velocity arrows"
      },
      "slip-contrast": {
        "copy": [
          "Slip breaks s=rθ; Translation plus rotation"
        ],
        "figure": "slipping wheel ghost, ground trace, distance and angle measures"
      }
    }
  }
];
