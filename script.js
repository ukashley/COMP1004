var generatedUsernames = [];

function GenerateUsername() {
    var numUsernames = parseInt(document.getElementById('numUsernames').value);
    var interest = document.getElementById('interests').value;
    var favoriteNumber = parseInt(document.getElementById('favNum').value);

    // Validation to make sure the number of usernames falls within a particular range.
    if (numUsernames > 5) {
        // Display an error message
        document.getElementById('generatedUsername').textContent = "Error: Number of usernames cannot exceed 5";
        return;
    }

    var generatedUsernamesArray = generateUsername(numUsernames, interest, favoriteNumber);
    // Add generated usernames to the main array
    generatedUsernames = generatedUsernames.concat(generatedUsernamesArray);
    // Display generated usernames
    document.getElementById('generatedUsername').textContent = generatedUsernamesArray.join(' - ');

}

function exportValues() {
    // Call the writeToFile function to export the generated usernames to a JSON file
    writeToFile('usernames.json', { "usernames": generatedUsernames });
}

function generateUsername(numUsernames, interests, favoriteNumber) {
    var usernames = []; // Array for storing the generated usernames

    // Define attributes and items for each interest
    var interestData = {
        "music": {
            "attributes": ['Melodic', 'Harmonic', 'Rhythmic', 'Sonic', 'Jazzy'],
            "items": ['Composer', 'Artist', 'Musician', 'Singer', 'Listener']
        },
        "sports": {
            "attributes": ['Athletic', 'Sporty', 'Agile', 'Energetic', 'Dynamic'],
            "items": ['Champion', 'Player', 'Athlete', 'Fan', 'Competitor']
        },
        "technology": {
            "attributes": ['Tech', 'Digital', 'Innovative', 'Coding', 'Futuristic'],
            "items": ['Geek', 'Developer', 'Hacker', 'God', 'Enthusiast']
        },
        "fashion": {
            "attributes": ['Stylish', 'Chic', 'Trendy', 'Fashionable', 'Dapper'],
            "items": ['Model', 'Designer', 'Fashionista', 'Forever', 'Icon']
        },
        "fitness": {
            "attributes": ['Fit', 'Healthy', 'Active', 'Strong', 'Vibrant'],
            "items": ['Athlete', 'Fitness', 'Warrior', 'Guru', 'Enthusiast']
        },
        "animals": {
            "attributes": ['Animal', 'Pet', 'Dog', 'Cat', 'Wildlife'],
            "items": ['Lover', 'Parent', 'Whisperer', 'Lover', 'Watcher']
        },
        "photography": {
            "attributes": ['Lens', 'Click', 'Snap', 'Photo', 'Shutter'],
            "items": ['Guru', 'Artist', 'Happy', 'Pro', 'Bug']
        }
    };

    // Generate usernames based on the specified interests
    for (let index = 0; index < numUsernames; index++) {
        var username = ''; // Initialize the username for each iteration

        // Handle both array and single interest
        if (Array.isArray(interests)) {
            interests.forEach(interest => {
                var data = interestData[interest];
                var attributes = data.attributes;
                var items = data.items;
                var attributeIndex = Math.floor(Math.random() * attributes.length);
                var itemIndex = Math.floor(Math.random() * items.length);
                // Concatenate username
                username += (username ? '_' : '') + attributes[attributeIndex] + '_' + items[itemIndex];
            });
        } else {
            var data = interestData[interests];
            var attributes = data.attributes;
            var items = data.items;
            var attributeIndex = Math.floor(Math.random() * attributes.length);
            var itemIndex = Math.floor(Math.random() * items.length);
            username += (username ? '_' : '') + attributes[attributeIndex] + '_' + items[itemIndex];
        }

        // Add favorite number to the username
        username += '_' + favoriteNumber;
        usernames.push(username); // Add the generated username to the array
    }
    return usernames;
}

function ClearAnswer() {
    document.getElementById('generatedUsername').textContent = '';
}

function importValues() {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (readerEvent) => {
            var content = readerEvent.target.result;
            var importedData = JSON.parse(content);

            // Extract data from the imported JSON object
            var favoriteNumber = importedData.favoriteNumber;
            var numberOfUsernames = importedData.numberOfUsernames;

            // Fill in input fields with imported data
            document.getElementById('favNum').value = favoriteNumber;
            document.getElementById('numUsernames').value = numberOfUsernames;

            // Generate usernames based on the imported data
            generateAndDisplayUsernames(numberOfUsernames, [], favoriteNumber); // Pass an empty array for interests
        };
    };

    // Manually trigger the file input dialog
    input.click();
}

// Function to write generated username to a JSON file
function writeToFile(filename, data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
