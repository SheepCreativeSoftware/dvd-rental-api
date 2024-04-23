import type { FilmsBySearchDto } from '../../api/film/getFilms/requestValidator';
import type { FindManyOptions } from 'typeorm';
import { ArrayContains, ILike } from 'typeorm';
import { dataSource } from '../dataSource';
import { Film } from '../entity/Film';
import { NotFoundException } from '../../scripts/customErrors';

const defaultFindOptions: FindManyOptions<Film> = {
	select: {
		filmId: true,
		description: true,
		releaseYear: true,
		title: true,
		length: true,
		rating: true,
		specialFeatures: true,
		language: {
			name: true,
		},
	},
	relations: { language: true },
};

const FilmRepository = dataSource.getRepository(Film).extend({
	async findById(id: number): Promise<Film> {
		const film = await this.findOne({
			...defaultFindOptions,
			where: { filmId: id },
		});

		if (film == null) {
			throw new NotFoundException();
		}

		return film;
	},

	async findAll(): Promise<Film[]> {
		const films = await this.find({ ...defaultFindOptions });

		if (films.length === 0) {
			throw new NotFoundException();
		}

		return films;
	},

	async findBySearch({
		description,
		language,
		specialFeatures,
		title,
	}: FilmsBySearchDto): Promise<Film[]> {
		const films = await dataSource.getRepository(Film).find({
			...defaultFindOptions,
			where: {
				title: title && ILike(`%${title}%`),
				description: description && ILike(`%${description}%`),
				language: { name: language && ILike(`%${language}%`) },
				specialFeatures: specialFeatures && ArrayContains([specialFeatures]),
			},
		});

		if (films.length === 0) {
			throw new NotFoundException();
		}

		return films;
	},
});

export { FilmRepository };
