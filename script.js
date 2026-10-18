const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categoryInput = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllButton = document.querySelector('#clear-all-btn');
const STORAGE_KEY = 'quicknotes-notes';

let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedNotes) ? savedNotes : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
  notesList.replaceChildren();
  updateCount();

  if (visibleNotes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-message';
    emptyItem.textContent = searchTerm ? 'No notes match your search.' : 'Your notes will appear here once you add one.';
    notesList.appendChild(emptyItem);
    return;
  }

  visibleNotes.forEach((note) => {
    const item = document.createElement('li');
    const card = document.createElement('article');
    card.className = `note-card category-${note.category.toLowerCase()}`;

    const topLine = document.createElement('div');
    topLine.className = 'note-topline';
    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete note: ${note.text}`);
    deleteButton.addEventListener('click', () => {
      notes = notes.filter((savedNote) => savedNote.id !== note.id);
      saveNotes();
      render();
    });

    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = note.category;
    const date = document.createElement('time');
    date.className = 'note-date';
    date.dateTime = note.createdAt;
    date.textContent = new Date(note.createdAt).toLocaleString();

    topLine.append(text, deleteButton);
    card.append(topLine, category, date);
    item.appendChild(card);
    notesList.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  const note = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    category: categoryInput.value,
    createdAt: new Date().toISOString()
  };
  notes.unshift(note);
  saveNotes();
  errorMessage.textContent = '';
  noteInput.value = '';
  render();
  noteInput.focus();
});

searchInput.addEventListener('input', render);



render();

clearAllButton.addEventListener('click', () => {
  if (notes.length === 0) return;
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});
