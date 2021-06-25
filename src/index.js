const express = require('express')
const app = express()
const morgan = require('morgan')

const matrizPonderada = arrayPonderacion()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('brandon bredly alvarez 201403862')
})

app.get('/game', (req, res) => {

    const turno = parseInt(req.query.turno)
    const estado = req.query.estado

    const casillaEnBlanco = 2
    const fichaBlanca = 1
    const fichaNegra = 0

    let pos = 0
    let x = 0
    let y = 0

    let arrayTablero = new Array(8)
    for (x = 0; x <= 7; x++) {
        arrayTablero[x] = new Array(8)
        for (y = 0; y <= 7; y++) {
            arrayTablero[x][y] = parseInt(estado[pos])
            pos++
        }
    }
    pos = 0
    x = 0
    y = 0

    let z = 0
    let w = 0
    let arregloPosiblesMovimientos = []

    for (x = 0; x <= 7; x++) {
        for (y = 0; y <= 7; y++) {
            if (arrayTablero[x][y] !== casillaEnBlanco) continue
            let posibleIndice = {
                x: x,
                y: y,
                total: 0,
                pond: matrizPonderada[x][y]
            }
            let counterMovs = 0

            if (turno === 0) {//turno de fichas negras

                if (y > 0) {//voy a revisar los valores de la izquierda
                    z = y - 1
                    counterMovs = 0

                    while (z > 0) {
                        if (arrayTablero[x][z] === casillaEnBlanco || arrayTablero[x][z] === fichaNegra) break
                        if (arrayTablero[x][z] === fichaBlanca) counterMovs++
                        z--
                        if (arrayTablero[x][z] === fichaNegra) break
                    }
                    if (arrayTablero[x][z] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }
                if (y <= 5) {//voy a revisar los valores a la derecha
                    z = y + 1
                    counterMovs = 0
                    while (z < 7) {
                        if (arrayTablero[x][z] === casillaEnBlanco || arrayTablero[x][z] === fichaNegra) break
                        if (arrayTablero[x][z] === fichaBlanca) counterMovs++
                        z++
                        if (arrayTablero[x][z] === fichaNegra) break
                    }
                    if (arrayTablero[x][z] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)

                    }
                }
                if (x >= 2) {//voy a revisar hacia arriba
                    z = x - 1
                    counterMovs = 0
                    while (z > 0) {
                        if (arrayTablero[z][y] === casillaEnBlanco || arrayTablero[z][y] === fichaNegra) break
                        if (arrayTablero[z][y] === fichaBlanca) counterMovs++
                        z--
                        if (arrayTablero[z][y] === fichaNegra) break
                    }
                    if (arrayTablero[z][y] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }
                if (x <= 5) {//voy a revisar hacia abajo
                    z = x + 1
                    counterMovs = 0
                    while (z < 7) {
                        if (arrayTablero[z][y] === casillaEnBlanco || arrayTablero[z][y] === fichaNegra) break
                        if (arrayTablero[z][y] === fichaBlanca) counterMovs++
                        z++
                        if (arrayTablero[z][y] === fichaNegra) break
                    }
                    if (arrayTablero[z][y] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)

                    }
                }

                /* REVISANDO EN DIAGONALES */

                //DIAGONAL DERECHA ARRIBA
                if (x >= 2 && y <= 5) {
                    z = x - 1
                    w = y + 1
                    counterMovs = 0
                    while (z > 0 && w < 7) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaNegra) break
                        if (arrayTablero[z][w] === fichaBlanca) counterMovs++
                        z--
                        w++
                        if (arrayTablero[z][w] === fichaNegra) break
                    }
                    if (arrayTablero[z][w] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                //DIAGONAL DERECHA ABAJO
                if (x <= 5 && y <= 5) {
                    z = x + 1
                    w = y + 1
                    counterMovs = 0
                    while (z < 7 && w < 7) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaNegra) break
                        if (arrayTablero[z][w] === fichaBlanca) counterMovs++
                        z++
                        w++
                        if (arrayTablero[z][w] === fichaNegra) break
                    }
                    if (arrayTablero[z][w] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                //DIAGONAL IZQUIERDA ARRIBA
                if (x >= 2 && y >= 2) {
                    z = x - 1
                    w = y - 1
                    counterMovs = 0
                    while (z > 0 && w > 0) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaNegra) break
                        if (arrayTablero[z][w] === fichaBlanca) counterMovs++
                        z--
                        w--
                        if (arrayTablero[z][w] === fichaNegra) break
                    }
                    if (arrayTablero[z][w] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                //DIAGONAL IZQUIERDA ABAJO
                if (x <= 5 && y >= 2) {
                    z = x + 1
                    w = y - 1
                    counterMovs = 0
                    while (z < 7 && w > 0) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaNegra) break
                        if (arrayTablero[z][w] === fichaBlanca) counterMovs++
                        z++
                        w--
                        if (arrayTablero[z][w] === fichaNegra) break
                    }
                    if (arrayTablero[z][w] === fichaNegra && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }




            } else {//turno fichas blancas

                if (y > 0) {//voy a revisar los valores de la izquierda
                    z = y - 1
                    counterMovs = 0

                    while (z > 0) {
                        if (arrayTablero[x][z] === casillaEnBlanco || arrayTablero[x][z] === fichaBlanca) break
                        if (arrayTablero[x][z] === fichaNegra) counterMovs++
                        z--
                        if (arrayTablero[x][z] === fichaBlanca) break
                    }
                    if (arrayTablero[x][z] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)

                    }
                }
                if (y <= 5) {//voy a revisar los valores a la derecha
                    z = y + 1
                    counterMovs = 0
                    while (z < 7) {
                        if (arrayTablero[x][z] === casillaEnBlanco || arrayTablero[x][z] === fichaBlanca) break
                        if (arrayTablero[x][z] === fichaNegra) counterMovs++
                        z++
                        if (arrayTablero[x][z] === fichaBlanca) break
                    }
                    if (arrayTablero[x][z] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }
                if (x >= 2) {//voy a revisar hacia arriba
                    z = x - 1
                    counterMovs = 0
                    while (z > 0) {
                        if (arrayTablero[z][y] === casillaEnBlanco || arrayTablero[z][y] === fichaBlanca) break
                        if (arrayTablero[z][y] === fichaNegra) counterMovs++
                        z--
                        if (arrayTablero[z][y] === fichaBlanca) break
                    }
                    if (arrayTablero[z][y] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }
                if (x <= 5) {//voy a revisar hacia abajo
                    z = x + 1
                    counterMovs = 0
                    while (z < 7) {
                        if (arrayTablero[z][y] === casillaEnBlanco || arrayTablero[z][y] === fichaBlanca) break
                        if (arrayTablero[z][y] === fichaNegra) counterMovs++
                        z++
                        if (arrayTablero[z][y] === fichaBlanca) break
                    }
                    if (arrayTablero[z][y] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                /* REVISANDO EN DIAGONALES */
                //DIAGONAL DERECHA ARRIBA
                if (x >= 2 && y <= 5) {
                    z = x - 1
                    w = y + 1
                    counterMovs = 0
                    while (z > 0 && w < 7) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaBlanca) break
                        if (arrayTablero[z][w] === fichaNegra) counterMovs++
                        z--
                        w++
                        if (arrayTablero[z][w] === fichaBlanca) break
                    }
                    if (arrayTablero[z][w] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                    }
                }

                //DIAGONAL DERECHA ABAJO
                if (x <= 5 && y <= 5) {
                    z = x + 1
                    w = y + 1
                    counterMovs = 0
                    while (z < 7 && w < 7) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaBlanca) break
                        if (arrayTablero[z][w] === fichaNegra) counterMovs++
                        z++
                        w++
                        if (arrayTablero[z][w] === fichaBlanca) break
                    }
                    if (arrayTablero[z][w] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                //DIAGONAL IZQUIERDA ARRIBA
                if (x >= 2 && y >= 2) {
                    z = x - 1
                    w = y - 1
                    counterMovs = 0
                    while (z > 0 && w > 0) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaBlanca) break
                        if (arrayTablero[z][w] === fichaNegra) counterMovs++
                        z--
                        w--
                        if (arrayTablero[z][w] === fichaBlanca) break
                    }
                    if (arrayTablero[z][w] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }

                //DIAGONAL IZQUIERDA ABAJO
                if (x <= 5 && y >= 2) {
                    z = x + 1
                    w = y - 1
                    counterMovs = 0
                    while (z < 7 && w > 0) {
                        if (arrayTablero[z][w] === casillaEnBlanco || arrayTablero[z][w] === fichaBlanca) break
                        if (arrayTablero[z][w] === fichaNegra) counterMovs++
                        z++
                        w--
                        if (arrayTablero[z][w] === fichaBlanca) break
                    }
                    if (arrayTablero[z][w] === fichaBlanca && counterMovs > 0) {
                        posibleIndice.total += counterMovs
                        //console.log(posibleIndice)
                    }
                }
            }
            if (posibleIndice.total > 0) {
                arregloPosiblesMovimientos.push(posibleIndice)
            }
        }

    }
    
    
    arregloPosiblesMovimientos.sort(function (a, b) {
        return b.pond - a.pond
    })

    res.send(arregloPosiblesMovimientos[0].x + '' + arregloPosiblesMovimientos[0].y)
})


function arrayPonderacion(){
    let x = 0
    let y = 0
    let arrayPonderacion = new Array(8)
    for (x = 0; x <= 7; x++) {
        arrayPonderacion[x] = new Array(8)
        for (y = 0; y <= 7; y++) {
            if(x === 0 || x === 7){
                if(y === 0 || y === 7) arrayPonderacion[x][y] = 120
                else if(y === 1 || y === 6) arrayPonderacion[x][y] = -20
                else if(y === 2 || y === 5) arrayPonderacion[x][y] = 20
                else arrayPonderacion[x][y] = 5
            }
            else if(x === 1 || x === 6){
                if(y === 0 || y === 7) arrayPonderacion[x][y] = -20
                else if(y === 1 || y === 6) arrayPonderacion[x][y] = -40
                else arrayPonderacion[x][y] = -5
            }
            else if(x === 2 || x === 5){
                if(y === 0 || y === 7) arrayPonderacion[x][y] = 20
                else if(y === 1 || y === 6) arrayPonderacion[x][y] = -5
                else if(y === 2 || y === 5) arrayPonderacion[x][y] = 15
                else arrayPonderacion[x][y] = 3
            }else{
                if(y === 0 || y === 7) arrayPonderacion[x][y] = 5
                else if(y === 1 || y === 6) arrayPonderacion[x][y] = -5
                else arrayPonderacion[x][y] = 3
            }
        }
    }
    return arrayPonderacion
}

app.listen(app.get('port'), () => {
    console.log('server running')
})