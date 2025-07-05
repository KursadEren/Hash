export function findZeroCount_512 (BinaryText){
    console.log(BinaryText.length)
    let a =  1024 - BinaryText.length % 1024 -128 ;
    console.log(a)
    return a
}

  


