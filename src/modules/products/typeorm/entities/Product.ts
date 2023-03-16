import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.product)
    order_products: OrdersProducts[]

    @Column()
    name: string;

    @Column({type:'decimal', precision:10 , scale: 2})
    price: number;

    @Column({type:'int'})
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
