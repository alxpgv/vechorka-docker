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

  async getNewspaperYears() {
    let query = this.newspaperRepository
      .createQueryBuilder('post')
      .select('YEAR(post_date) as year, post_type')
      .where('post_type="newspaper" AND post_status="publish"')
      .groupBy('YEAR(post_date), post_type');

    return await query.getRawMany();
  }

  async getNewspapersByYear({ year, allYears = false }: NewspaperParamsDTO) {
    let query = this.newspaperRepository.createQueryBuilder('post');
    query.where('post_type="newspaper" AND post_status="publish"');

    if (year) {
      query.andWhere('YEAR(post.post_date)=:year', { year });
    } else {
      query.andWhere('YEAR(post.post_date)=year(curdate())');
    }

    const posts = await query.getMany();

    if (allYears) {
      return {
        years: await this.getNewspaperYears(),
        posts: this.responseData(posts),
      };
    }

    return this.responseData(posts);
  }

  private responseData(posts: Post[]) {
    if (!posts.length) {
      throw new NotFoundException('posts not found');
    }

    let postsByMonth: {
      [key: number]: Partial<PostResponse & { attached: string }>[];
    } = {};

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

        if (postsByMonth[numberMonth]) {
          postsByMonth[numberMonth].push(newPost);
        } else {
          postsByMonth[numberMonth] = [newPost];
        }
      }
    }

    return postsByMonth;
  }
}
