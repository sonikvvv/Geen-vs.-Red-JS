# Green-vs-Red

## Description:

'Green vs. Red' is a game played on a 2D grid that in theory can be infinite (in our case we will assume that `x` <= `y` < `21`).

Each cell on this grid can be either green (represented by `1`) or red (represented by `0`). The game always receives an initial state of the grid which we will call 'Generation Zero'. After that a set of 4 rules are applied across the grid and those rules form the next generation.

## Rules that create the next generation:

1. Each red cell that is surrounded by exactly 3 or exactly 6 green cells will also become green in the next generation.
2. A red cell will stay red in the next generation if it has either 0, 1, 2, 4, 5, 7 or 8 green neighbors.
3. Each green cell surrounded by 0, 1, 4, 5, 7 or 8 green neighbors will become red in the next generation.
4. A green cell will stay green in the next generation if it has either 2, 3 or 6 green neighbors.

## Important facts:

* Each cell can be surrounded by up to 8 cells. 4 on the sides and 4 on the corners. Exceptions are the corners and the sides of the grid.
* All the 4 rules apply at the same time for the whole grid in order for the next generation to be formed.

## Special requirement:

Write the game in a way that uses several classes, good naming convention and documentation are also recommended.

## Task:

Create a program that accepts:

* The size of our grid - x, y (`x` being the width and `y` being the height)

## Tables:


| i - 1,j - 1 | i - 1, j | i, j + 1 |
| :-: | :-: | :-: |
| **i,j - 1** | **i, j** | **i, j + 1** |
| **i + 1,j - 1** | **i  + 1, j** | **i, j + 1** |

- All cell neighbours with their coordinates.


| -- | -0 | -+ |
| - | - | - |
| **0-** | **00** | **0+** |
| **+-** | **+0** | **++** |

**+** Stands for + 1. **-** Stands for - 1 and **0** for no change.


| CTL | ST | CTR |
| :-: | :-: | :-: |
| **SL** | **IN** | **SR** |
| **CBL** | **SB** | **CBR** |

**C** = corner, **S** = side, **T** = top, **B** = bottom, **L** = left, **R** = right and **IN** = inside.
