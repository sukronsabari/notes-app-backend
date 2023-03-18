/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const notes = require('./notes');

function addNoteHandler(req, h) {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    createdAt,
    updatedAt,
    tags,
    body,
  };

  notes.push(newNote);

  const addNotesSuccess = notes.filter((note) => note.id === id).length > 0;
  console.log(addNotesSuccess);
  if (addNotesSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201)
      .type('application/json');
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);
}

function getAllNotesHandler() {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
}

function getNotesByIdHandler(req, h) {
  const { id } = req.params;
  const note = notes.find((_note) => _note.id === id);

  if (note) {
    return h.response({
      status: 'success',
      data: {
        note,
      },
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
}

function editNoteByIdHandler(req, h) {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200)
      .type('application/json');
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal diperbarui. Id tidak ditemukan',
    })
    .code(400);
}

function deleteNoteByIdHandler(req, h) {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    .code(400);
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
