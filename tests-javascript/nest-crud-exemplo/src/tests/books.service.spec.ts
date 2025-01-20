// src/books/tests/books.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books//dto/create-book.dto';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        price: 29.99,
      };

      const book = service.create(createBookDto);

      expect(book).toEqual({
        id: expect.any(Number),
        ...createBookDto,
        createdAt: expect.any(Date),
      });
    });
  });

  describe('findOne', () => {
    it('should return a book if it exists', () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        price: 29.99,
      };

      const createdBook = service.create(createBookDto);
      const foundBook = service.findOne(createdBook.id);

      expect(foundBook).toEqual(createdBook);
    });

    it('should throw NotFoundException if book does not exist', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });
});
