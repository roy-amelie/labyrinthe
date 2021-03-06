"use strict";
var labirynthe = [[0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 1, 1], [0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 0], [0, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 1], [0, 1, 0, 0, 0, 0]]

let start = [0, 0];
let position = [start, 'x']
let end = [4, 2]
let road = []
let crossroad = [];
// console.log(position[0])
// console.log(labirynthe.length)

while(position[0] != end){
    
    road.push(position[0])
    let dir = cardinal_points_possible(position)

    // check if position is a new position or if already borrow
    // if count == 0 -> new
    let count = 0
        for (let j=0; j<crossroad.length; j++){
            if (crossroad[j]==position[0]){
                count ++
            }
        }
    // check if it's not dead end and if it's a new position    
    if (dir.length >= 1 && count == 0){
        // if it's a crossroad add it to the array
        if (dir.length> 1){
            let dir_rest=[]
            for (let i = 1; i<dir.length; i++){
                dir_rest.push(dir[i])
            }
            crossroad.push([position[0], dir_rest])
        }
        // take the first possible direction 
        dir = dir[0]
    // return to the last crossroad see
    } else {
        let index_last_crossroad = crossroad.length - 1
        position[0] = crossroad[index_last_crossroad][0]
        let array_dir = crossroad[index_last_crossroad][1]
        dir = array_dir[0]
        // if there is no more possibility delete the last index
        if (array_dir.length==1){
            crossroad.pop()
        // else delete just the direction use
        } else {
            
        }
    }
    position = shifting(position[0], dir)
}

console.log(road)
console.log(crossroad)

function shifting (current_coordinate, direction){
    let new_position = []
    if (direction == 's'){
        new_position = [current_coordinate[0], current_coordinate[1]+1]    
    }
    if(direction == 'e'){
        new_position = [current_coordinate[0]+1, current_coordinate[1]]
    }
    if (direction == 'n'){
        new_position = [current_coordinate[0], current_coordinate[1]-1]
    }
    if (direction == 'w'){
        new_position = [current_coordinate[0]-1, current_coordinate[1]]
    }
    let where_i_come_from = opposit_direction(direction)
    return [new_position, where_i_come_from]
}

function opposit_direction(direction){
    if (direction == 's'){
        return 'n'
    }
    if (direction == 'e'){
        return 'w'
    }
    if (direction == 'n'){
        return 's'
    }
    if (direction == 'w'){
        return 'e'
    }
}

function cardinal_points_possible(position) {
    let option_list = [];
    let coordinate = position[0];
    console.log(coordinate);
    let direction = position[1];
    if (south_exist(coordinate) && 's' != direction) {
        option_list.push('s')
    }
    if (east_exist(coordinate) && 'e' != direction){
        option_list.push('e')
    }
    if (north_exist(coordinate) && 'n' != direction){
        option_list.push('n')
    }
    if (west_exist(coordinate) && 'w' != direction){
        option_list.push('w')
    }
    return option_list;
}

function south_exist(coordinate){
    if (coordinate[1] < labirynthe[0].length -1 && labirynthe[coordinate[0]][coordinate[1] + 1] === 0) {
        return true
    } else {
        return false
    }
}

function north_exist(coordinate){
    let x = coordinate[0]
    let y = coordinate[1]
    if (y > 0 && labirynthe[x][y-1] === 0){
        return true
    } else {
        return false
    }
}

function east_exist(coordinate){
    if (coordinate[0]<labirynthe.length -1 && labirynthe[coordinate[0] + 1][coordinate[1]] === 0){
        return true
    } else {
        return false
    }
}

function west_exist(coordinate){
    let x = coordinate[0]
    let y = coordinate[1]
    if (x>0 && labirynthe[x - 1][y] === 0){
        return true
    } else {
        return false
    }
}

