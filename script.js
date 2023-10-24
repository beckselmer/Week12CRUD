const TEAM_ROSTER = 'http://localhost:3000/teamRoster'//

$.get(TEAM_ROSTER).then((data) =>//maps over data 
    data.map((player) => {
        $('tbody').append(
            $(`
            <tr>
                <td>${player.id}</td>
                <td>${player.fullName}</td>
                <td>${player.position}</td>
                <td>
                    <button onclick="deleteUser('${player.id}')">🗑</button> 
                </td>
            </tr>`)
        );
    })
)

$('#submitPlayer').click(function () {
    $.post(TEAM_ROSTER, {//this will post a new player to the table
        fullName: $('#newName').val(),
        position: $('#newPosition').val(),
    })
    .done(function() {//made this done function and fail function to pup up in the console. Happens real quick.
        console.log('New player added successfully');
    })
    .fail(function() {
        console.log('Error adding new player', error);
    })
})

function deleteUser(id) {//Deletes a specific player from the table
    $.ajax(`${TEAM_ROSTER}/${id}`, {
        type: 'DELETE',
    })
}

function updateUser() {//updates the players information
    var id = $('#updateId').val();

    $.ajax(`${TEAM_ROSTER}/${id}`, {
        method: 'PUT',
        data: {
            fullName: $('#updateName').val(),
            position: $('#updatePosition').val(),
        },
    });
}

$('#updatePlayer').click(updateUser);