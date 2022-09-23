import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('wp_options')
@Unique('option_name', ['option_name'])
@Index('autoload', ['autoload'])
export class Option {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  option_id: number;

  @Column({ type: 'varchar', length: 191, default: '' })
  option_name: string;

  @Column({ type: 'longtext' })
  option_value: string;

  @Column({ type: 'varchar', length: 20, default: 'yes' })
  autoload: string;
}
