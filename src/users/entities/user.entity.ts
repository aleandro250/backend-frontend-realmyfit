import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name;

    @Column({ type: 'varchar', length: 255 })
    lastName;

    @Column({ type: 'varchar', length: 255 })
    docType;

    @Column({ type: 'varchar', length: 255 })
    docNumber;

    @Column({ type: 'varchar', length: 55 })
    miTest;
}
