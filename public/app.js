$("#scrape").on("click", function() {

    console.log("\n Start scrape request");

    $.ajax("/scrape", {
        type: "GET"
    })
    .then(function() {

        console.log("\n Scrape finished");

    });

});

$("#article").on("click", function() {

    console.log("\n Render scrape info");

    location.reload();
});

$(document).on("click", ".articleTitle", function() {

    $("#notes").empty();

    const notesId = $("#notes");

    let thisId = $(this).attr("id");

    const newForm = $("<form class='mt-4 id='newForm'> <div class='form-group'> <input class='alert-dark form-control' id='newNoteTitle'name='newNoteTitle'> </div> <div class='form-group'> <textarea class='alert-dark form-control' id='newNoteBody' name='newNoteBody'></textarea> <button class='text-dark font-weight-bold mt-3 btn btn-success' data-id='" + thisId + "' id='createNote'>Create Note</button> </form>");

    notesId.append(newForm);

    // newFormId.append("<input class='row' id='newNoteTitle'name='newNoteTitle'>");

    // newFormId.append("<textarea class='row' id='newNoteBody' name='newNoteBody'></textarea>");

    // newFormId.append("<button class='' data-id='" + thisId + "' id='createNote'>Create Note</button>");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function( notesData ) {

            // location.reload();
            console.log(notesData[0].title)

            $("#newNoteTitle").val(notesData[0].title);

            $("#newNoteBody").val(notesData[0].body);

            console.log( thisId );

        });

});

$(document).on("click", "#createNote", function() {

    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $("#newNoteTitle").val(),

            body: $("#newNoteBody").val()

        }
    })
        .then(function( createdNote ) {

            console.log( createdNote );

            $("#notes").empty();
        });

    $("#newNoteTitle").val("");
    $("#newNoteBody").val("");

});