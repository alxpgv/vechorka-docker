import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';
import { Repository } from 'typeorm';
import { NewspaperParamsDTO } from './newspaper.dto';
import { PostResponse } from '../post/post.interface';

@Injectable()
export class NewspaperService {
  constructor(
    @InjectRepository(Post)
    private readonly newspaperRepository: Repository<Post>,
  ) {}

  async getNewspaperLastRelease() {
    let query = this.newspaperRepository
      .createQueryBuilder('post')
      .where('post_type="newspaper" AND post_status="publish"')
      .orderBy('post_date', 'DESC');

    return this.responseDataOne(await query.getOne()) ?? null;
  }

  async getNewspaperYears() {
    let query = this.newspaperRepository
      .createQueryBuilder('post')
      .select('YEAR(post_date) as year')
      .where('post_type="newspaper" AND post_status="publish"')
      .groupBy('YEAR(post_date)');

    const years = await query.getRawMany();

    return years ? years.map((y) => y.year) : null;
  }

  async getNewspapersByYear({
    year,
    allYears = false,
    lastRelease = false,
  }: NewspaperParamsDTO) {
    year = year ?? new Date().getFullYear();

    let query = this.newspaperRepository.createQueryBuilder('post');
    query
      .where('post_type="newspaper" AND post_status="publish"')
      .andWhere('YEAR(post.post_date)=:year', { year });

    const posts = await query.getMany();
    const { activeMonths, postsByMonth } = this.responseDataMany(posts);

    let response = {
      posts: postsByMonth,
      postsMonths: activeMonths,
      postsYear: year,
      allYears: null,
      lastRelease: null,
    };

    if (allYears) {
      response.allYears = await this.getNewspaperYears();
    }

    if (lastRelease) {
      response.lastRelease = await this.getNewspaperLastRelease();
    }

    return response;
  }

  private responseDataMany(posts: Post[]) {
    if (!posts.length) {
      throw new NotFoundException('posts not found');
    }

    let postsByMonth: {
      [key: number]: Partial<PostResponse & { attached: string }>[];
    } = {};

    let activeMonths = [];

    for (const post of posts) {
      const createdDate = new Date(post.post_date);
      const numberMonth = createdDate.getUTCMonth() + 1;
      if (numberMonth) {
        // get attached link
        const attached = post.post_content.match(/href="(.+)"/i);

        const newPost = {
          id: post.ID,
          title: post.post_title,
          attached: attached[1] || null,
          createdAt: post.post_date,
        };

        if (activeMonths.indexOf(numberMonth) === -1) {
          activeMonths.push(numberMonth);
        }

        if (postsByMonth[numberMonth]) {
          postsByMonth[numberMonth].push(newPost);
        } else {
          postsByMonth[numberMonth] = [newPost];
        }
      }
    }

    return { activeMonths, postsByMonth };
  }

  private responseDataOne(post: Post) {
    if (!post) {
      throw new NotFoundException('posts not found');
    }

    const attached = post.post_content.match(/href="(.+)"/i);

    return {
      id: post.ID,
      title: post.post_title,
      attached: attached[1] || null,
      createdAt: post.post_date,
    };
  }
}
