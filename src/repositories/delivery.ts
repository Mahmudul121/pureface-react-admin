import { CreateDelivery, UpdateDelivery } from "@ts-types/generated";
import Base from "./base";

class Delivery extends Base<CreateDelivery, UpdateDelivery> {}

export default new Delivery();
