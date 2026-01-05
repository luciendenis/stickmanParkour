// This file must be loaded after movement.js since it adds movements to the list movementConfigs that is declared in the file
movementConfigs = movementConfigs.concat([
    {
        name: "frontHandPunchMid",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.2,
                                z: 1
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.1
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2,
                                z: -1
                            },
                            extension: 0.88
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.1781,
                                z: -1
                            },
                            extension: 0.85
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 12,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.3
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6,
                                z: 0.1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.3781,
                                z: -1
                            },
                            extension: 0.82
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backHandPunchMid",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.2,
                                z: 1
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2,
                                z: -1
                            },
                            extension: 0.88
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.1781,
                                z: -1
                            },
                            extension: 0.85
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 12,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 6,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5.9,
                                z: 0.1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.8,
                                z: 1
                            },
                            extension: 0.8
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.3781,
                                z: -1
                            },
                            extension: 0.82
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "frontHandPunchHigh",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    offsets: {
                        position: {
                            x: 10,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.2,
                                z: 0.3
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.5,
                                z: 1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 0.88
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.2781,
                                z: -1
                            },
                            extension: 0.75
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 18,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.5,
                                z: 1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.15
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5,
                                z: 1,
                                "forceRotationDirection": -1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.5,
                                z: -0.5
                            },
                            extension: 0.82
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backHandPunchHigh",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    offsets: {
                        position: {
                            x: 10,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.5,
                                z: 1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.2,
                                z: 0.3
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 0.88
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.2781,
                                z: -1
                            },
                            extension: 0.75
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 18,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5,
                                z: 1,
                                "forceRotationDirection": -1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.5,
                                z: 1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.15
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.5,
                                z: -0.5
                            },
                            extension: 0.82
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "frontHandPunchLow",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    offsets: {
                        position: {
                            x: 20,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.5,
                                z: 0.3,
                                "forceRotationDirection": -1
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 3,
                                z: 0.1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.6,
                                z: -1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.2781,
                                z: -1
                            },
                            extension: 0.55
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 22,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 6,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.9,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 0,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 3.5,
                                z: 1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.1,
                                z: 1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.85,
                                z: 0.8
                            },
                            extension: 0.97
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1,
                                z: -1
                            },
                            extension: 0.35
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backHandPunchLow",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    offsets: {
                        position: {
                            x: 20,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 5.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 3,
                                z: 0.1,
                                "forceRotationDirection": 1
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.5,
                                z: 0.3,
                                "forceRotationDirection": -1
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.6,
                                z: -1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.2781,
                                z: -1
                            },
                            extension: 0.55
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 22,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 6,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.9,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 0,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.1,
                                z: 1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 3.5,
                                z: 1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.85,
                                z: 0.8
                            },
                            extension: 0.97
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1,
                                z: -1
                            },
                            extension: 0.35
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "frontLegKickMid",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    offsets:{
                        position:{
                            x:-20,
                            y:0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.2,
                                z: 1,
                                forceRotationDirection:-1
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5.9,
                                z: 1,
                                forceRotationDirection:-1
                            },
                            extension: 0.75
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 0.85
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 0.3,
                                z: -1
                            },
                            extension: 0.3
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 15,
                            y: -5
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.7,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.8,
                                z: 1
                            },
                            extension: 0.90
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.9,
                                z: -1
                            },
                            extension: 0.97
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 5.95,
                                z: -1
                            },
                            extension: 0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backLegKickMid",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    duration:0.8,
                    offsets: {
                        position: {
                            x: -12,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.5,
                                z: 1
                            },
                            extension: 0.9
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.5,
                                z: -1
                            },
                            extension: 0.2
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.97
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.1,
                                z: 1,
                                forceRotationDirection: 1
                            },
                            extension: 0.25
                        }
                    ]
                },
                {
                    duration:0.6,
                    offsets: {
                        position: {
                            x: 15,
                            y: -5
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 4.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 1.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.2,
                                z: -1
                            },
                            extension: 0.75
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.9,
                                z: -1
                            },
                            extension: 0.97
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 5.6,
                                z: -1
                            },
                            extension: 0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "frontLegKickHigh",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    duration:0.8,
                    offsets: {
                        position: {
                            x: -35,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.9,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5.6,
                                z: 1,
                                forceRotationDirection:-1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.9
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 6.2,
                                z: -1
                            },
                            extension: 0.2
                        }
                    ]
                },
                {
                    duration:0.5,
                    offsets: {
                        position: {
                            x: 0,
                            y: -30
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 3.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.4,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5.6,
                                z: 1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.999
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 5.3,
                                z: -1
                            },
                            extension: 0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backLegKickHigh",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    duration:1,
                    offsets: {
                        position: {
                            x: -35,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.9,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.8,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 0.5,
                                z: -1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.1,
                                z: -1,
                                forceRotationDirection:-1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.85
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.3,
                                z: 1
                            },
                            extension: 0.99
                        }
                    ]
                },
                {
                    duration:0.7,
                    offsets: {
                        position: {
                            x: 0,
                            y: -30
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 3.7,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.4,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 5.6,
                                z: 1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.7,
                                z: 1
                            },
                            extension: 0.999
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 5.3,
                                z: -1
                            },
                            extension: 0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "frontLegKickLow",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    duration:1,
                    offsets: {
                        position: {
                            x: 0,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.6,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6,
                                z: 1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.8,
                                z: 1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.4,
                                z: 0.4
                            },
                            extension: 0.5
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 0.3,
                                z: -1
                            },
                            extension: 0.25
                        }
                    ]
                },
                {
                    duration:0.5,
                    offsets: {
                        position: {
                            x: 30,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.4,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2.1,
                                z: 1
                            },
                            extension: 0.999
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.1,
                                z: 0.2
                            },
                            extension: 0.7
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 0.1,
                                z: -1
                            },
                            extension: 0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "backLegKickLow",
        config: {
            cycle: false,
            switchSide: false,
            resetAfter: true,
            positions: [
                {
                    duration:1,
                    offsets: {
                        position: {
                            x: 0,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.5,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.6,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.2,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 1.8,
                                z: 1
                            },
                            extension: 0.99
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6,
                                z: -1
                            },
                            extension: 0.95
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 0.3,
                                z: -1
                            },
                            extension: 0.25
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 1.4,
                                z: -0.6
                            },
                            extension: 0.5
                        }
                    ]
                },
                {
                    duration:0.5,
                    offsets: {
                        position: {
                            x: 30,
                            y: 0
                        }
                    },
                    elements: [
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "shoulders",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 3.3,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "center",
                            middleJunction: "",
                            endJunction: "hips",
                            startLength: "chest",
                            endLength: "",
                            angles: {
                                xy: 0.4,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "",
                            endJunction: "head",
                            startLength: "neck",
                            endLength: "",
                            angles: {
                                xy: 4.1,
                                z: -1
                            },
                            extension: 1
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "backelbow",
                            endJunction: "backhand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 2,
                                z: 1
                            },
                            extension: 0.4
                        },
                        {
                            startJunction: "shoulders",
                            middleJunction: "frontelbow",
                            endJunction: "fronthand",
                            startLength: "upperarm",
                            endLength: "forearm",
                            angles: {
                                xy: 6.1,
                                z: 1
                            },
                            extension: 0.999
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "backknee",
                            endJunction: "backfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 0.1,
                                z: -1
                            },
                            extension: 0.999
                        },
                        {
                            startJunction: "hips",
                            middleJunction: "frontknee",
                            endJunction: "frontfoot",
                            startLength: "thighs",
                            endLength: "calves",
                            angles: {
                                xy: 2.1,
                                z: 0.2
                            },
                            extension: 0.7
                        }
                    ]
                }
            ]
        }
    },
    {
        name: "guard",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.6,
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.6,
                                z:1
                            },
                            extension:0.5
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.8,
                                z:1
                            },
                            extension:0.6
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.1,
                                z:-1
                            },
                            extension:0.90
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:1.1781,
                                z:-1
                            },
                            extension:0.85
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardJump",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.5,
                    offsets:{
                        velocity:{
                            x:0,
                            y:-9
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.5,
                                z:1
                            },
                            extension:0.95
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.2,
                                z:1
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:1.3708,
                                z:-1
                            },
                            extension:0.98
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2,
                                z:1
                            },
                            extension:0.999
                        }
                    ]
                },
                {
                    duration:0.8,
                    offsets:{
                        position:{
                            x:0,
                            y:-30
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.5,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.3,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.4,
                                z:-0.9
                            },
                            extension:0.35
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.5,
                                z:0.8
                            },
                            extension:0.4
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardJumpForward",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.7,
                    offsets:{
                        position:{
                            y:-20
                        },
                        velocity:{
                            x:6,
                            y:-12
                        },
                        angles:{
                            xy:0.5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.7,
                                z:1
                            },
                            extension:0.95
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.5,
                                z:1
                            },
                            extension:0.98
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:1.6,
                                z:-1
                            },
                            extension:0.98
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.1,
                                z:1
                            },
                            extension:0.999
                        }
                    ]
                },
                {
                    duration:1.1,
                    offsets:{
                        position:{
                            x:30,
                            y:-45
                        },
                        angles:{
                            xy:3.5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardJumpBackwards",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.7,
                    offsets:{
                        position:{
                          y:-30
                        },
                        velocity:{
                            x:-6,
                            y:-12
                        },
                        angles:{
                            xy:-0.5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.4,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:4.1,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.2,
                                z:1
                            },
                            extension:0.95
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5,
                                z:1
                            },
                            extension:0.98
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:1.6,
                                z:-1
                            },
                            extension:0.99
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.1,
                                z:-1
                            },
                            extension:0.999
                        }
                    ]
                },
                {
                    duration:1.1,
                    offsets:{
                        position:{
                            x:30,
                            y:-45
                        },
                        angles:{
                            xy:-3.5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardForward",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.7,
                    offsets:{
                        position:{
                            x:30,
                            y:-20
                        },
                        velocity:{
                            x:6,
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:5.5,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:2.3,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.6,
                                z:1
                            },
                            extension:0.5
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.8,
                                z:1
                            },
                            extension:0.6
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.8,
                                z:-1
                            },
                            extension:0.999
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.5,
                                z:-1
                            },
                            extension:0.9999
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardBackwards",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.7,
                    offsets:{
                        position:{
                            x:-30,
                            y:-20
                        },
                        velocity:{
                            x:-6,
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.2,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.6,
                                z:1
                            },
                            extension:0.5
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.8,
                                z:1
                            },
                            extension:0.6
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.7,
                                z:-1
                            },
                            extension:0.9999
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.2,
                                z:-1
                            },
                            extension:0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardDuck",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.7,
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:5.5,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:2.4,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5.3,
                                z:-0.5
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.3,
                                z:1
                            },
                            extension:0.5
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.5,
                                z:1
                            },
                            extension:0.75
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:1.1,
                                z:-1
                            },
                            extension:0.55
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.1,
                                z:0.4
                            },
                            extension:0.6
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardDuckForward",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.5,
                    offsets:{
                        position:{
                            x:30,
                            y:-20
                        },
                        velocity:{
                            x:6,
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:5.1,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:2,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5.3,
                                z:-0.5
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.1,
                                z:1
                            },
                            extension:0.65
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.7,
                                z:1
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.8,
                                z:-1
                            },
                            extension:0.75
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.6,
                                z:0.4
                            },
                            extension:0.999
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardDuckBackwards",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:0.5,
                    offsets:{
                        position:{
                            x:-30,
                            y:-20
                        },
                        velocity:{
                            x:-6,
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:5.1,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:2,
                                z:0.3
                            },
                            extension:0.3
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:5.3,
                                z:-0.5
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.3,
                                z:1
                            },
                            extension:0.5
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:5.5,
                                z:1
                            },
                            extension:0.75
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.6,
                                z:-1
                            },
                            extension:0.999
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:2.4,
                                z:0.4
                            },
                            extension:0.9
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardRollForward",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:1.2,
                    offsets:{
                        position:{
                            x:0,
                            y:0
                        },
                        velocity: {
                            x:6
                        },
                        angles:{
                            xy:3
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                },
                {
                    duration:1,
                    offsets:{
                        position:{
                            x:0,
                            y:0
                        },
                        angles:{
                            xy:5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                }
            ]
        }
    },
    {
        name:"guardRollBackwards",
        config:{
            cycle:false,
            switchSide:false,
            positions:[
                {
                    duration:1.2,
                    offsets:{
                        position:{
                            x:0,
                            y:0
                        },
                        velocity: {
                            x:-6
                        },
                        angles:{
                            xy:-3
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                },
                {
                    duration:1,
                    offsets:{
                        position:{
                            x:0,
                            y:0
                        },
                        angles:{
                            xy:-5
                        }
                    },
                    elements:[
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"shoulders",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:4.9,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"center",
                            middleJunction:"",
                            endJunction:"hips",
                            startLength:"chest",
                            endLength:"",
                            angles:{
                                xy:1.7,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"",
                            endJunction:"head",
                            startLength:"neck",
                            endLength:"",
                            angles:{
                                xy:6,
                                z:-1
                            },
                            extension:1
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"backelbow",
                            endJunction:"backhand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.9,
                                z:0.6
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"shoulders",
                            middleJunction:"frontelbow",
                            endJunction:"fronthand",
                            startLength:"upperarm",
                            endLength:"forearm",
                            angles:{
                                xy:0.75,
                                z:0.5
                            },
                            extension:0.8
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"frontknee",
                            endJunction:"frontfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.1,
                                z:-1
                            },
                            extension:0.2
                        },
                        {
                            startJunction:"hips",
                            middleJunction:"backknee",
                            endJunction:"backfoot",
                            startLength:"thighs",
                            endLength:"calves",
                            angles:{
                                xy:0.3,
                                z:-1
                            },
                            extension:0.25
                        }
                    ]
                }
            ]
        }
    }
]);