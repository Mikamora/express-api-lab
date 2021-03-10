

$("#add-chirp").click(e => {
    e.preventDefault();
    let user = $("#title").val();
    let text = $("#content").val();

    $.ajax({
        type: "POST",
        url: "/api/chirps",
        data: { user, text }
    })
        .then(res => {
            console.log(res);
            displayChirps();
        })
    $("#title").val("");
    $("#content").val("");
})

displayChirps();

function displayChirps() {
    $.ajax({
        type: "GET",
        url: "/api/chirps"
    })
        .then(chirpItems => {
            $("#container").empty();

            for (const id in chirpItems) { //for in loops through objects
                if (id === "nextid") return;

                const delBtn = $("<button>Delete</button>").click(() => {
                    $.ajax({
                        type: "DELETE",
                        url: `api/chirps/${id}`
                    })
                        .then(res => {
                            console.log(res);
                            displayChirps();
                        })
                });

                $(`
            <div>
                <div>${chirpItems[id].user}</div>
                <div>${chirpItems[id].text}</div>
            </div>
            `)
                    .appendTo("#container")
                    .append(delBtn)
                    .append(editBtn);
            }
        });
}