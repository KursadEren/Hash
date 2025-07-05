
export function findZeroCount_256 (BinaryText){
    console.log(BinaryText.length)
    let a =  512 - BinaryText.length % 512 -64 ;
    console.log(a)
    return a
}