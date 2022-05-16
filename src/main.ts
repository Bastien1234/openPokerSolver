import makeDeck from "./deck/makeDeck";
import handSolver from "./handSolver/handSolver";
import Tree from "./tree/Tree.ts";
import RangeMaker from "./tree/RangeMaker.ts";
import { generate2, generate3, generate4 } from "./utils/generate";
import pickIndexFromVector from './utils/pickIndexFromVector';

function main()
{
    console.log("Starting to solve...");
    console.time('solving');
    
    const range = new RangeMaker();

    // This to modify later
    const matrixOOP = [
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 50, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 20]
    ]

    const matrixIP = [
        [10, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [10, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 80, 80, 40, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 40, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 40, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [100, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 60],
        [50, 90, 80, 40, 80, 60, 40, 50, 0, 10, 20, 50, 60],
        [50, 90, 80, 80, 80, 60, 40, 50, 0, 10, 20, 80, 20]
    ]

    const handsOOP = range.rangeToList(matrixOOP, 10);
    const handsIP = range.rangeToList(matrixIP, 10);

    const board = ["Ah", "Ac", "Ts", "7h", "2h"];
    const heroHand = ["Kh", "Kd"];
    const heroPosition = "ip";

    const iterations1 = 100;
    const iterations2 = 50;
    const pot = 1000;
    const effectiveStack = 5000;

    const tree = new Tree(
        pot,
        effectiveStack,
        handsOOP,
        handsIP,
        [24, 60, 120],
        [2500, 3500],
        [33, 60, 125],
        [2700, 3200],
        // 3 --- max raises
    )

    /*
        Starting solving operations
    */

    tree.makeRiverTree();

    console.log(tree)

    // Memoization
    interface hashMap { [key: string]: number; }
    let solvedHands: hashMap = {};



}

export default main;