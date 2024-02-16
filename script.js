class Piece {
    
    constructor(color, position) {
        this.color = color
        this.position = position
        this.isKing = false
    }
    draw() {
        const pos = document.querySelector(`#square${this.position}`)
        const div = document.createElement('div')
        div.classList.add('circle')
        if(this.color === 'blue') {
            div.classList.add('blue-piece');
        }
        else {
            div.classList.add('red-piece');
        }
        pos.appendChild(div)
    }

}

let player1 = 'blue'
let player2 = 'red'
let turn = player1
let selectedPiece = false
let divSelected = ''
let possibleMoves = []
let player1HasPieceToTake = false
let player2HasPieceToTake = false
let vez = document.querySelector('#turn')

const bluepieces = []
const redpieces = []

function start() {

    if(turn === player1) {
        vez.innerHTML = "Sua vez de jogar"
    }
    else {
        vez.innerHTML = "Vez do adversário jogar"
    }

    positions_b.forEach(position => {
        let p = new Piece('blue', position.pos)
        p.draw()        
        bluepieces.push(p)
    })

    positions_r.forEach(position => {
        let p = new Piece('red', position.pos)
        p.draw()
        redpieces.push(p)
    })

}


function onHooverPiece(position) {
    
    checkIfHasPiecesToTake(turn)
    
    let piece = ''
    if(piece !== null) {
        piece = document.querySelector(`#square${position}`)
    }
    const divPiece = piece.lastChild
    if(divPiece !== null) {
        const myturn = divPiece.classList.contains('blue-piece') ? 'blue' : 'red'
        if(myturn === 'blue' && turn === player1) {
            checkFreePositions(position, 'blue')
        }
        else if(myturn === 'red' && turn === player2) {
            checkFreePositions(position, 'red')
        }
    }

}

function checkFreePositions(currentPos, theTurn) { 
    
    if(theTurn === player1 && player1HasPieceToTake || turn === player2 && player2HasPieceToTake) {
        return
    }    

    positionsAlloweds.forEach(position => {
        if(position.current_position === currentPos) {
            position.possible_moves.forEach(possible => {
                const p = document.querySelector(`#square${possible}`)
                if(p.lastChild === null) {                    
                    if(turn === player1 && theTurn === player1) {
                        if(currentPos > possible) {
                            p.classList.add('green')
                        }
                    }
                    else if(turn === player2 && theTurn === player2) {
                        if(currentPos < possible && theTurn === player2) {
                            p.classList.add('green')
                        }
                    }
                }                
            })
        }
    })
}

function makeTheMove(possibleMovements, newSelectedPos) {    
    
    if(turn === player1 && player1HasPieceToTake) {
        return
    }
    if(turn === player2 && player2HasPieceToTake) {
        return
    }
    
    removeTransparentClass()

    if(possibleMovements.includes(newSelectedPos)) {        
        divSelected.removeChild(divSelected.lastChild)
        const newPosition = document.querySelector(`#square${newSelectedPos}`)
        const divPiece = document.createElement('div')
        divPiece.classList.add('circle')
        if(turn === 'blue') {
            divPiece.classList.add('blue-piece')
        }
        else {
            divPiece.classList.add('red-piece')
        }
        newPosition.appendChild(divPiece)
        
        if(selectedPiece && turn === player1) {
            turn = player2
            selectedPiece = false
            divSelected = ''
        }
        else if(selectedPiece && turn === player2) {
            turn = player1
            selectedPiece = false        
            divSelected = ''
        }
        if(turn === player1) {
            vez.innerHTML = "Sua vez de jogar"
        }
        else {
            vez.innerHTML = "Vez do adversário jogar"
        }    
    }
    else {
        divSelected = ''
        possibleMoves = []
        selectedPiece = false  
    }

}

function selectPiece(currentPos) {

    if(turn === player1 && player1HasPieceToTake) {
        return
    }
    if(turn === player2 && player2HasPieceToTake) {
        return
    }

    if(!selectedPiece) {
        
        divSelected = document.querySelector(`#square${currentPos}`)
        if(divSelected.lastChild === null) {
            return
        }
        
        let options = 0
        const divPiece = document.querySelector(`#square${currentPos}`).lastChild
        const isBluePiece = divPiece.classList.contains('blue-piece')
        let piece = ''
        if(isBluePiece) {
            piece = 'blue'
        }
        else {
            piece = 'red'
        }        
        if(piece === turn) {
            removeTransparentClass()
            divSelected.classList.add('transparent')            
            positionsAlloweds.forEach(position => {
                if(position.current_position === currentPos) {
                    position.possible_moves.forEach(possible => {
                        const p = document.querySelector(`#square${possible}`)
                        if(p.lastChild === null) {
                            if(turn === player1) {
                                if(currentPos > possible) {
                                    possibleMoves.push(possible)
                                }
                            }
                            if(turn === player2) {
                                if(currentPos < possible) {
                                    possibleMoves.push(possible)
                                }
                            }
                        }                
                    })
                }
            })
            selectedPiece = true
        }        
    }
    else {
        makeTheMove(possibleMoves, currentPos)
    }    
}

function checkIfHasPiecesToTake(turn) {
     
    myPiecesCurrentPositions = []
    lista = document.querySelectorAll('.square')
    lista.forEach(item => {
        const divPiece = item.lastChild
        if(divPiece !== null) {            
            if(divPiece.classList.contains(turn) === turn) {
                myPiecesCurrentPositions.push(item.title)                
            }
        }        
    })    
    myPiecesCurrentPositions.forEach(piece => {
        let pieceToTake, finalSquare
        for(let i = 0; i < takingPieces.length; i++) {
            if(parseInt(takingPieces[i].start) === parseInt(piece)) {
                pieceToTake = document.querySelector(`#square${takingPieces[i].middle}`)
                if(pieceToTake.lastChild !== null) {
                    const imgSrc = pieceToTake.lastChild.src.replace(/^.*[\\\/]/, '')
                    if(imgSrc !== turn) {
                        finalSquare = document.querySelector(`#square${takingPieces[i].end}`)
                        if(finalSquare.lastChild === null) {
                            pieceToTake.classList.add("red")
                            finalSquare.classList.add("red")
                            if(turn === player1) {
                                player1HasPieceToTake = true
                            }
                            else {
                                player2HasPieceToTake = true
                            }
                            if(turn === player1 && player2HasPieceToTake) {
                                pieceToTake.classList.remove("red")
                                finalSquare.classList.remove("red")
                            }
                            if(turn === player2 && player1HasPieceToTake) {
                                pieceToTake.classList.remove("red")
                                finalSquare.classList.remove("red")
                            }
                        }
                    }
                }
            }
        }
        takingPieces.forEach(taking => {            
            if(piece === taking.start) {
                const div = document.querySelector(`#square${taking.end}`)                
                if(div.lastChild === null) {                    
                }
            }
        })
    })

    takingPieces.forEach(takingPiece => {
        if(takingPiece.pos === currentPos) {
            const otherDiv =  document.querySelector(`#square${takingPiece.other}`)
            const emptyDiv = document.querySelector(`#square${takingPiece.end}`)
            if(otherDiv.lastChild !== null) {
                if(!otherDiv.lastChild.contains(turn) && emptyDiv.lastChild === null) {                                                                     
                    const myDiv =  document.querySelector(`#square${takingPiece.pos}`)
                    myDiv.classList.add("red")
                    otherDiv.classList.add("red")
                    emptyDiv.classList.add("red")
                }                    
            } 
        }
    })    

}

function removeTransparentClass() {
    const elements = document.querySelectorAll('.square')
    elements.forEach(element => {
        element.classList.remove('transparent')
        element.classList.remove('green')
    })
}

const elements = document.querySelectorAll('.square')
elements.forEach((element) => {
    element.addEventListener('mouseleave', () => {
        elements.forEach((el) => {
            el.classList.remove('red')
            el.classList.remove('blue')
            el.classList.remove('green')
        })
    })    
})

elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        elements.forEach((el) => {
            const divPiece = element.lastChild
            if(divPiece !== null) {
                const pieceHasBlueClass = divPiece.classList.contains('blue-piece')
                const pieceHasRedClass = divPiece.classList.contains('red-piece')
                if(turn == player1 && !pieceHasBlueClass) {
                    element.style.cursor = 'not-allowed'
                }
                if(turn == player2 && !pieceHasRedClass) {
                    element.style.cursor = 'not-allowed'
                }
            }
        })
    })
})

setTimeout(() => {
    start()    
}, 1000)