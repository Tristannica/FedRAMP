document.addEventListener('DOMContentLoaded', function() {
    fetch('controls.json') // Make sure to update this path
        .then(response => response.json())
        .then(data => populateDropdowns(data))
        .catch(error => console.error('Error loading the JSON data: ', error));
});

function populateDropdowns(data) {
    const controlsContainer = document.getElementById('controls-container');

    Object.keys(data).forEach(family => {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const button = document.createElement('button');
        button.innerText = family;
        button.onclick = function() {
            this.nextElementSibling.classList.toggle("show");
        };

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        data[family].forEach(control => {
            const controlElement = document.createElement('a');
            controlElement.href = '#';
            controlElement.innerText = `${control.ID}: ${control['Control Name']}`;
            dropdownContent.appendChild(controlElement);

            // Nested Description and Discussion under each control
            const descriptionElement = document.createElement('p');
            descriptionElement.innerText = `Description: ${control['NIST Control Description']}`;
            descriptionElement.style.marginLeft = '20px';
            dropdownContent.appendChild(descriptionElement);

            const discussionElement = document.createElement('p');
            discussionElement.innerText = `Discussion: ${control['NIST Discussion']}`;
            discussionElement.style.marginLeft = '20px';
            dropdownContent.appendChild(discussionElement);
        });

        dropdown.appendChild(button);
        dropdown.appendChild(dropdownContent);
        controlsContainer.appendChild(dropdown);
    });
}

// Close the dropdown menus if the user clicks outside of them
window.onclick = function(event) {
    if (!event.target.matches('.dropdown button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
