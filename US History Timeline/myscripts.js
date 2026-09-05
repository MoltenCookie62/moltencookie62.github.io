class TimeLineElement
{
    constructor(name, date, explanation, significance, imageLink) 
    {
        this.name = name;
        this.date = date;
        this.year = Number(date[1] + date[2] + date[3] + date[4]);
        this.explanation = explanation;
        this.significance = significance
        this.imageLink = imageLink;
    }
    
    ToHTML()
    {
        var event = '';

        event += '<event>';
        
            event += '<h1>' + '<a id="' + MakeTag(this.name) + '">' + this.name + '</a>' + '</h1>';

            if(this.date == "")
            {
                event += '<p>(XXXX)</p>';
            }
            else
            {
                event += '<p>' + this.date + '</p>';
            }
            
            event += "<div class=\"grid-container\">";
                
                event += "<div class=\"grid-child\">";
                
                if(this.explanation == "")
                {
                    event += "<b>Explanation:</b> <text style=\"color: #C0C0C0\">Text not found</text>";
                }
                else
                {
                    event += "<b>Explanation:</b> " + this.explanation;
                }
                    
                event += "<br><br>";
                
                if(this.significance == "")
                {
                    event += "<b>Significance:</b> <text style=\"color: #C0C0C0\">Text not found</text>";
                }
                else
                {
                    event += "<b>Significance:</b> " + this.significance;
                }
                
                event += "</div>";
            
                var imageText = "";
        
            
                if(this.imageLink == "")
                {
                    imageText = "<img src = \"https://codehs.com/uploads/2c88ed5a7231e604be76760637f52ee4\" alt=\"Image not found\" width=\"270px\" height=\"210px\">";
                }
                else
                {
                    imageText = "<img src = \""+this.imageLink +"\" alt=\"Image not found\" width=\"270px\" height=\"210px\">";
                }
            
                event += "<div class=\"grid-child\">" + imageText + "</div>"
                
            event += "</div>"

        event += '</event>';

        return event;
    }
}

    
function MakeTag(x)
{
    output = "";
    
    for(var i = 0; i < x.length; i++)
    {
        if(x[i] == ' ')
        {
            output += '_';
        }
        else
        {
            output += x[i];
        }
    }
    return output;
}


function Start()
{
    // FETCHING DATA FROM JSON FILE
    $.getJSON(document.getElementById("json").innerHTML, 
    function (data) {

        var events = [];

        // ITERATING THROUGH OBJECTS
        $.each(data, 
            function (key, value) 
            {
                events.push(new TimeLineElement(value.name, value.date, value.explanation, value.significance, value.imageLink));
            }
        );
        
        events.sort((a, b) => (a.year > b.year) ? 1 : -1)

        var TopRow = '';
        var BottomRow = '<offset></offset>';

        for (var i = 0; i < events.length; i++) 
        {
            if(i % 2 == 0)
            {
                TopRow += events[i].ToHTML();
            }
            else
            {
                BottomRow += events[i].ToHTML();
            }
        }

        document.getElementById("topRow").innerHTML = TopRow;
        document.getElementById("botRow").innerHTML = BottomRow;
        
        document.getElementById("load").innerHTML = "";
        document.getElementById("json").innerHTML = "";
    });
}