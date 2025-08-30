import { test, expect} from '@playwright/test';
import { API_ENDPOINTS } from '../utils/apiendpoints';
import { generateToken } from '../utils/testutils';
import addBook from '../data/book.json'
import fs from 'fs';

let validToken = fs.readFileSync('generatedtoken', 'utf-8');
let bookId;


test.describe('Books Management API Tests', () => {

    // test.beforeAll(async ({ request }) => {
    //     const { tokenResp } = await generateToken(request);
    //     validToken = tokenResp.token;
    // });
    test('Add a book with valid token', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.ADD_NEW_BOOK, {
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            },
            data: addBook.CreateBook,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        bookId = body.id;
        expect(bookId).not.toBeNull();
    });

    test('Fetch book record by ID', async ({ request }) => {
        const response = await request.get(API_ENDPOINTS.GET_BOOK_ID(bookId), {
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            }
        });
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.name).toContain(addBook.CreateBook.name);
    });

    test('Update book record by ID', async ({ request }) => {
        const response = await request.put(API_ENDPOINTS.UPDATE_BOOK(bookId), {
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            },
            data: addBook.UpdateBook,
        });

        expect(response.status()).toBe(200);

        const updatedData = await response.json();
        expect(updatedData.name).toBe(addBook.UpdateBook.name);
    });

    test('Fetch all books', async ({ request }) => {
        const response = await request.get(API_ENDPOINTS.GET_ALL_BOOKS, {
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            }

        });
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.length).toBeGreaterThan(0);
    });

    test('Delete book by ID', async ({ request }) => {

        const response = await request.delete(API_ENDPOINTS.GET_BOOK_ID(bookId), {
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            }
        });
        expect(response.status()).toBe(200);

        const result = await response.json();
        expect(result.message).toContain('Book deleted successfully');

    });
})
