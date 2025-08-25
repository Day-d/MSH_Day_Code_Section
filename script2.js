document.addEventListener('DOMContentLoaded', () => {
    const heroCardsContainer = document.querySelector('.hero-cards-container');
    const heroEditForm = document.getElementById('heroEditForm');
    const heroImageUpload = document.getElementById('heroImageUpload');
    const uploadButton = document.getElementById('uploadButton');
    const previewImage = document.getElementById('previewImage');
    const defaultImageIcon = document.querySelector('.image-upload-area .fas.fa-image'); // Select the default image icon
    const destinationInput = document.getElementById('destination');
    const fromWhereInput = document.getElementById('fromWhere');
    const okButton = document.querySelector('.btn-ok');
    const cancelButton = document.getElementById('cancelButton');

    let currentEditingCard = null; // To keep track of which card is being edited
    let newImageBase64 = null; // To store the base64 of the newly uploaded image

    // Sample data for hero section (in a real application, this would come from a backend API)
    let heroItems = [
        {
            id: 1,
            image: 'images/i3.jpg',
            destination: 'NGAPALI BEACH',
            fromWhere: 'Rakhine Myanmar'
        },
        {
            id: 2,
            image: 'images/i3.jpg',
            destination: 'BAGAN',
            fromWhere: 'Mandalay Myanmar'
        },
        {
            id: 3,
            image: 'images/i3.jpg',
            destination: 'BAGAN',
            fromWhere: 'Mandalay Myanmar'
        }
    ];

    // Function to render hero cards
    function renderHeroCards() {
        heroCardsContainer.innerHTML = ''; // Clear existing cards
        heroItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('hero-card');
            card.setAttribute('data-id', item.id); // Store item ID on the card

            card.innerHTML = `
                <img src="${item.image}" alt="${item.destination}" class="hero-card-image">
                <div class="hero-card-edit">
                    <i class="fas fa-edit"></i> Edit
                </div>
                <div class="hero-card-content">
                    <h4>${item.destination}</h4>
                    <div class="hero-card-tags">
                        <span class="hero-card-tag">${item.fromWhere.split(' ')[0]}</span>
                        <span class="hero-card-tag">${item.fromWhere.split(' ').slice(1).join(' ')}</span>
                    </div>
                </div>
            `;
            heroCardsContainer.appendChild(card);
        });

        addEditButtonListeners();
    }

    // Function to add event listeners to edit buttons
    function addEditButtonListeners() {
        document.querySelectorAll('.hero-card-edit').forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.target.closest('.hero-card');
                const itemId = parseInt(card.getAttribute('data-id'));
                const itemToEdit = heroItems.find(item => item.id === itemId);

                if (itemToEdit) {
                    currentEditingCard = card; // Set the current card being edited
                    newImageBase64 = null; // IMPORTANT: Clear any previously selected new image

                    previewImage.src = itemToEdit.image;
                    previewImage.style.display = 'block';
                    defaultImageIcon.style.display = 'none'; // Hide the default icon when image is present

                    destinationInput.value = itemToEdit.destination;
                    fromWhereInput.value = itemToEdit.fromWhere;
                    heroImageUpload.value = ''; // Clear the file input's selected file to allow new selection
                }
            });
        });
    }

    // Handle image upload button click
    uploadButton.addEventListener('click', () => {
        heroImageUpload.click(); // Trigger the hidden file input
    });

    // Handle image file selection
    heroImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                defaultImageIcon.style.display = 'none'; // Hide default icon when image is present
                newImageBase64 = e.target.result; // Store the new image in base64 format
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected (e.g., user cancels file dialog)
            // Re-evaluate if default icon should be shown based on whether previewImage has content
            if (!previewImage.src || previewImage.src === window.location.href) { // Check if previewImage is empty or default empty string
                previewImage.style.display = 'none';
                defaultImageIcon.style.display = 'block'; // Show default icon only if no image is truly loaded
            }
            newImageBase64 = null; // Clear the new image data
        }
    });

    // Handle form submission (OK button)
    heroEditForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const newDestination = destinationInput.value.trim();
        const newFromWhere = fromWhereInput.value.trim();

        const imageToUpdate = newImageBase64 || previewImage.src; // Use new image if uploaded, else existing preview image

        if (currentEditingCard) {
            const itemId = parseInt(currentEditingCard.getAttribute('data-id'));
            const itemIndex = heroItems.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                heroItems[itemIndex].image = imageToUpdate;
                heroItems[itemIndex].destination = newDestination;
                heroItems[itemIndex].fromWhere = newFromWhere;

                // Update the displayed card
                currentEditingCard.querySelector('.hero-card-image').src = imageToUpdate;
                currentEditingCard.querySelector('.hero-card-content h4').textContent = newDestination;
                const tags = currentEditingCard.querySelectorAll('.hero-card-tag');
                tags[0].textContent = newFromWhere.split(' ')[0];
                tags[1].textContent = newFromWhere.split(' ').slice(1).join(' ');

                alert('Hero item updated successfully!');
            }
        } else {
            alert('Please select an item to edit first.');
        }

        // Reset the form after submission
        resetForm();
    });

    // Handle Cancel button
    cancelButton.addEventListener('click', () => {
        resetForm();
    });

    // Function to reset the form
    function resetForm() {
        currentEditingCard = null;
        newImageBase64 = null; // Clear new image data on reset
        heroEditForm.reset(); // Resets input fields
        previewImage.src = '';
        previewImage.style.display = 'none';
        defaultImageIcon.style.display = 'block'; // Show the default icon
        heroImageUpload.value = ''; // Clear the file input's selected file (important!)
    }

    // Initial rendering of cards when the page loads
    renderHeroCards();
});