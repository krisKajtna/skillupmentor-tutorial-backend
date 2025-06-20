import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Base } from './base.entity'
import { Order } from './order.entity'

@Entity('order_item')
export class OrderItem extends Base {
  @Column()
  product_title: string

  @Column()
  price: number

  @Column()
  quantity: number

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order
}
