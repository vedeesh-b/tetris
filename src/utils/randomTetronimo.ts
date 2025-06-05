import { 
    O_SHAPE,
    I_SHAPE,
    S_SHAPE,
    Z_SHAPE,
    L_SHAPE,
    J_SHAPE,
    T_SHAPE
} from "../const"

export default function randomTetronimo() {
    const tetronimoArr = [ O_SHAPE, I_SHAPE, S_SHAPE, Z_SHAPE, L_SHAPE, J_SHAPE, T_SHAPE ]
    const index = Math.floor(Math.random() * tetronimoArr.length)
    return tetronimoArr[index]
}