const levelConfigs = [
    {
        name: "tutorial1",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 20
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 1350,
                    y: 20
                }
            },
            levelLimits: {
                width: 1500,
                height: 400,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: []
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: []
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: []
                }
            },
            texts: [
                {
                    coordinates: {x: 500, y: 300},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Use ARROW LEFT and ARROW RIGHT to move,", "move around to collect all the gears,", "then go to the exit to finish the level"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 500,
                                y: 100
                            }
                        }
                    ]
                }
            },
            assets: []
        }
    },
    {
        name: "tutorial2",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 20
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 1600,
                    y: 20
                }
            },
            levelLimits: {
                width: 1700,
                height: 300,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 400,
                        xWidth: 30,
                        yBottom: 20,
                        yHeight: 200,
                        color: "black"
                    },
                    {
                        xLeft: 800,
                        xWidth: 400,
                        yBottom: 20,
                        yHeight: 200,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: []
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: []
                }
            },
            texts: [
                {
                    coordinates: {x: 220, y: 280},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Use ARROW UP to climb up"]
                },
                {
                    coordinates: {x: 1200, y: 280},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Use ARROW DOWN to climb down"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 900,
                                y: 250
                            }
                        }
                    ]
                }
            },
            assets: []
        }
    },
    {
        name: "tutorial3",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 20
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 1850,
                    y: 20
                }
            },
            levelLimits: {
                width: 2000,
                height: 250,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 340,
                        xWidth: 150,
                        yBottom: 180,
                        yHeight: 90,
                        color: "black"
                    },
                    {
                        xLeft: 1600,
                        xWidth: 150,
                        yBottom: 180,
                        yHeight: 90,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: []
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: [
                        {
                            xLeft: 340,
                            xWidth: 150,
                            yBottom: 110,
                            yHeight: 70,
                            patternRepeat: 8,
                            direction: "down"
                        },
                        {
                            xLeft: 1600,
                            xWidth: 150,
                            yBottom: 110,
                            yHeight: 70,
                            patternRepeat: 8,
                            direction: "down"
                        }
                    ]
                }
            },
            texts: [
                {
                    coordinates: {x: 180, y: 240},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Watch out for the spikes, use", "ARROW DOWN to duck"]
                },
                {
                    coordinates: {x: 670, y: 240},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Use ARROW UP to get up"]
                },
                {
                    coordinates: {x: 1350, y: 240},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["You can slide under these ones", "By ducking while running !"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 650,
                                y: 100
                            }
                        }
                    ]
                }
            },
            assets: []
        }
    },
    {
        name: "tutorial4",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 200
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 150,
                    y: 650
                }
            },
            levelLimits: {
                width: 1700,
                height: 1100,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 20,
                        xWidth: 600,
                        yBottom: 20,
                        yHeight: 180,
                        color: "black"
                    },
                    {
                        xLeft: 1200,
                        xWidth: 520,
                        yBottom: 20,
                        yHeight: 180,
                        color: "black"
                    },
                    {
                        xLeft: 20,
                        xWidth: 420,
                        yBottom: 600,
                        yHeight: 50,
                        color: "black"
                    },
                    {
                        xLeft: 1200,
                        xWidth: 520,
                        yBottom: 600,
                        yHeight: 50,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: []
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: [
                    {
                        xLeft: 1600,
                        yBottom: 200,
                        yHeight: 450,
                        color: "black"
                    }
                ]
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: [
                        {
                            xLeft: 620,
                            xWidth: 580,
                            yBottom: 20,
                            yHeight: 50,
                            patternRepeat: 16,
                            direction: "up"
                        }
                    ]
                }
            },
            texts: [
                {
                    coordinates: {x: 350, y: 500},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["Press SPACEBAR to prepare your jump while running", "release at the right moment to make your jump !"]
                },
                {
                    coordinates: {x: 1330, y: 500},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["Use ARROW UP to climb up a ladder"]
                },
                {
                    coordinates: {x: 850, y: 1000},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["If you feel the gap is too wide,", "you can use ARROW UP", "to grab the edge and make it"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 900,
                                y: 500
                            }
                        }
                    ]
                }
            },
            assets: []
        }
    },
    {
        name: "tutorial5",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 20
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 150,
                    y: 830
                }
            },
            levelLimits: {
                width: 1700,
                height: 1100,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 490,
                        xWidth: 40,
                        yBottom: 20,
                        yHeight: 600,
                        color: "black"
                    },
                    {
                        xLeft: 1200,
                        xWidth: 520,
                        yBottom: 20,
                        yHeight: 180,
                        color: "black"
                    },
                    {
                        xLeft: 1150,
                        xWidth: 200,
                        yBottom: 750,
                        yHeight: 30,
                        color: "black"
                    },
                    {
                        xLeft: 20,
                        xWidth: 300,
                        yBottom: 800,
                        yHeight: 30,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: []
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: [
                    {
                        anchorLeft: {
                            x: 230,
                            y: 1100
                        },
                        anchorRight: {
                            x: 1300,
                            y: 1100
                        },
                        color: "black"
                    }
                ]
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: [
                        {
                            xLeft: 530,
                            xWidth: 670,
                            yBottom: 20,
                            yHeight: 50,
                            patternRepeat: 16,
                            direction: "up"
                        }
                    ]
                }
            },
            texts: [
                {
                    coordinates: {x: 330, y: 760},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["Some obstacles are too high to make in one jump.", "After jumping one time towards the wall, ", "you can hit jump a second time on the wall", "while holding ARROW UP and reach higher !"]
                },
                {
                    coordinates: {x: 840, y: 450},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["Use ARROW DOWN to hang from the edge,", "then simply jump to clear the gap"]
                },
                {
                    coordinates: {x: 1300, y: 720},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["If you wall jump", "WITHOUT holding ARROW UP", "you can reach this edge"]
                },
                {
                    coordinates: {x: 850, y: 1000},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["You can grab onto this rope using ARROW UP", "and then move along with ARROW LEFT and RIGHT.", "To get off it use ARROW DOWN"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 1250,
                                y: 850
                            }
                        }
                    ]
                }
            },
            assets: []
        }
    },
    {
        name: "tutorial6",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 20
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 850,
                    y: 460
                }
            },
            levelLimits: {
                width: 1700,
                height: 1100,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.3,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 20,
                        xWidth: 1400,
                        yBottom: 270,
                        yHeight: 40,
                        color: "black"
                    },
                    {
                        xLeft: 1380,
                        xWidth: 40,
                        yBottom: 310,
                        yHeight: 700,
                        color: "black"
                    },
                    {
                        xLeft: 1150,
                        xWidth: 40,
                        yBottom: 820,
                        yHeight: 300,
                        color: "black"
                    },
                    {
                        xLeft: 950,
                        xWidth: 40,
                        yBottom: 310,
                        yHeight: 600,
                        color: "black"
                    },
                    {
                        xLeft: 210,
                        xWidth: 740,
                        yBottom: 770,
                        yHeight: 40,
                        color: "black"
                    },
                    {
                        xLeft: 750,
                        xWidth: 200,
                        yBottom: 310,
                        yHeight: 150,
                        color: "black"
                    },
                    {
                        xLeft: 150,
                        xWidth: 40,
                        yBottom: 430,
                        yHeight: 40,
                        color: "black"
                    },
                    {
                        xLeft: 310,
                        xWidth: 40,
                        yBottom: 410,
                        yHeight: 40,
                        color: "black"
                    },
                    {
                        xLeft: 470,
                        xWidth: 40,
                        yBottom: 420,
                        yHeight: 40,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: [
                    {
                        coordinates: {
                            x: 1380,
                            y: 600
                        },
                        size: 30,
                        type: "sideRight",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 1380,
                            y: 850
                        },
                        size: 30,
                        type: "sideRight",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 990,
                            y: 700
                        },
                        size: 30,
                        type: "sideLeft",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 830,
                            y: 1050
                        },
                        size: 30,
                        type: "front",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 640,
                            y: 1070
                        },
                        size: 30,
                        type: "front",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 470,
                            y: 1060
                        },
                        size: 30,
                        type: "front",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 310,
                            y: 1040
                        },
                        size: 30,
                        type: "front",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 140,
                            y: 1030
                        },
                        size: 30,
                        type: "front",
                        hangWithLegs: false,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 20,
                            y: 820
                        },
                        size: 30,
                        type: "sideLeft",
                        hangWithLegs: true,
                        color: "black"
                    },
                    {
                        coordinates: {
                            x: 20,
                            y: 630
                        },
                        size: 30,
                        type: "sideLeft",
                        hangWithLegs: true,
                        color: "black"
                    }
                ]
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: [
                        {
                            xLeft: 20,
                            xWidth: 730,
                            yBottom: 310,
                            yHeight: 50,
                            patternRepeat: 19,
                            direction: "up"
                        },
                        {
                            xLeft: 990,
                            xWidth: 390,
                            yBottom: 310,
                            yHeight: 50,
                            patternRepeat: 10,
                            direction: "up"
                        },
                        {
                            xLeft: 210,
                            xWidth: 740,
                            yBottom: 810,
                            yHeight: 30,
                            patternRepeat: 24,
                            direction: "up"
                        }
                    ]
                }
            },
            texts: [
                {
                    coordinates: {x: 1200, y: 200},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["With the right timing,", "you can chain wall jumps", "and reach the top of this wall"]
                },
                {
                    coordinates: {x: 1185, y: 670},
                    fontColor: "white",
                    fontSize: 20,
                    text: ["Those are climbing holds", "Use ARROW UP to grab them,", "ARROW DOWN to let go", "and spacebar to jump from them,", "with ARROW UP to jump up"]
                },
                {
                    coordinates: {x: 580, y: 970},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["You don't always need to use ARROW UP to use holds.", "If you are close enough you will grab onto them automatically", "However you can use SHIFT to speed your way through"]
                },
                {
                    coordinates: {x: 570, y: 730},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["You will automatically jump between small blocks that are close.", "You can also use SHIFT to go faster", "For bigger gaps you still need to jump"]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 1350,
                                y: 750
                            }
                        },
                        {
                            coordinates: {
                                x: 100,
                                y: 900
                            }
                        }
                    ]
                }
            },
            assets: [
                {
                    id: "c70f6fa0-591f-4808-bfd4-292b456c0213",
                    parent: null,
                    type: "wall_bricks",
                    layer: 0,
                    order: 0,
                    config: {
                        bottomLeftCoords: {
                            x: 190,
                            y: 790
                        },
                        height: 200,
                        width: 740,
                        orientation: 0,
                        layerHeightMin: 25,
                        layerHeightMax: 40,
                        brickWidthMin: 50,
                        brickWidthMax: 100,
                        brickBorderRadius: 3,
                        jointThickness: 0.4,
                        strokeStrength: 1.5,
                        strokeColor: "hsla(0,0%,100%,0.35)",
                        roughOptions: {
                            roughness: 0.3
                        },
                        brickColors: [
                            "hsla(0,0%,0%,0)"
                        ],
                        jointColor: "hsla(0,0%,0%,0)",
                        brickRoughness: 6
                    }
                },
                {
                    id: "59f850b0-58dc-429e-abfe-6967ae70b83e",
                    parent: null,
                    type: "wall_bricks",
                    layer: 0,
                    order: 0,
                    config: {
                        bottomLeftCoords: {
                            x: 0,
                            y: 992
                        },
                        height: 103,
                        width: 930,
                        orientation: 0,
                        layerHeightMin: 25,
                        layerHeightMax: 40,
                        brickWidthMin: 50,
                        brickWidthMax: 100,
                        brickBorderRadius: 3,
                        jointThickness: 0.4,
                        strokeStrength: 1.5,
                        strokeColor: "hsla(0,0%,100%,0.35)",
                        roughOptions: {
                            roughness: 0.3
                        },
                        brickColors: [
                            "hsla(0,0%,0%,0)"
                        ],
                        jointColor: "hsla(0,0%,0%,0)",
                        brickRoughness: 6
                    }
                }
            ]
        }
    },
    {
        name: "tutorial7",
        config: {
            spawn: {
                coordinates: {
                    x: 150,
                    y: 220
                },
                direction: 1,
                frontSide: "left",
                action: "idling"
            },
            exit: {
                coordinates: {
                    x: 150,
                    y: 1140
                }
            },
            levelLimits: {
                width: 2000,
                height: 1400,
                xLeft: 20,
                xRight: 20,
                yGround: 20,
                yCeiling: 20,
                color: "black",
                linesRoughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    bowing: 0,
                    roughness: 0.8
                },
                rectRoughOptions: {
                    stroke: "transparent",
                    strokeWidth: 2,
                    bowing: 0,
                    fillStyle: "cross-hatch",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                }
            },
            blocks: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.8,
                    fill: "white"
                },
                instances: [
                    {
                        xLeft: 20,
                        xWidth: 600,
                        yBottom: 20,
                        yHeight: 200,
                        color: "black"
                    },
                    {
                        xLeft: 20,
                        xWidth: 600,
                        yBottom: 1100,
                        yHeight: 40,
                        color: "black"
                    }
                ]
            },
            climbingHolds: {
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    fillStyle: "hachure",
                    hachureAngle: 40,
                    fillWeight: 1,
                    roughness: 0.2,
                    fill: "white"
                },
                instances: [
                    {
                        coordinates:{
                            x:1100,
                            y:550
                        },
                        size:30,
                        type:"pole",
                        hangWithLegs:false,
                        color:"black"
                    },
                    {
                        coordinates:{
                            x:1700,
                            y:800
                        },
                        size:30,
                        type:"pole",
                        hangWithLegs:false,
                        color:"black"
                    },
                    {
                        coordinates:{
                            x:1200,
                            y:1050
                        },
                        size:30,
                        type:"pole",
                        hangWithLegs:false,
                        color:"black"
                    }
                ]
            },
            ladders: {
                width: 80,
                yStep: 30,
                lineWidth: 5,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            ropes: {
                lineWidth: 4,
                roughOptions: {
                    stroke: "white",
                    strokeWidth: 2,
                    roughness: 0.8
                },
                instances: []
            },
            hazards: {
                spikes: {
                    color: "black",
                    lineWidth: 4,
                    roughOptions: {
                        stroke: "red",
                        strokeWidth: 2,
                        roughness: 0.8
                    },
                    instances: [
                        {
                            xLeft: 620,
                            xWidth: 1400,
                            yBottom: 20,
                            yHeight: 50,
                            patternRepeat: 50,
                            direction: "up"
                        }
                    ]
                }
            },
            texts: [
                {
                    coordinates: {x: 1100, y: 900},
                    fontColor: "white",
                    fontSize: 25,
                    text: ["These are poles, you can hang onto them using ARROW UP.",
                        "Use ARROW LEFT and ARROW RIGHT to swing and gain momentum.",
                        "Press SPACEBAR to prepare your jump when you have gained enough.",
                        "Release to jump in the direction you are facing"
                    ]
                }
            ],
            collectibles: {
                gears: {
                    color: "black",
                    lineWidth: 2,
                    roughOptions: {
                        stroke: "white",
                        strokeWidth: 2,
                        roughness: 0.5
                    },
                    instances: [
                        {
                            coordinates: {
                                x: 1100,
                                y: 650
                            }
                        },
                        {
                            coordinates: {
                                x: 1700,
                                y: 850
                            }
                        }
                    ]
                }
            },
            assets: [
                {
                    id: "cbb6d5dc-9231-4136-81ac-6c2bcd8f1414",
                    parent: null,
                    type: "wall_bricks",
                    layer: 0,
                    order: 0,
                    config: {
                        bottomLeftCoords: {
                            x: 600,
                            y: 0
                        },
                        height: 1400,
                        width: 1400,
                        orientation: 0,
                        layerHeightMin: 35,
                        layerHeightMax: 45,
                        brickWidthMin: 80,
                        brickWidthMax: 85,
                        brickBorderRadius: 5,
                        jointThickness: 0.4,
                        strokeStrength: 1.5,
                        strokeColor: "hsla(0,0%,100%,0.35)",
                        roughOptions: {
                            roughness: 0.3
                        },
                        brickColors: [
                            "hsla(0,0%,0%,0)"
                        ],
                        jointColor: "hsla(0,0%,0%,0)",
                        brickRoughness: 6
                    }
                }
            ]
        }
    },
];
