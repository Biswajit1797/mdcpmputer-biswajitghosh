import gpu from "@/assets/gpu.jpg";
import keyboard from "@/assets/keyboard.jpg";
import monitor from "@/assets/monitor.jpg";
import mouse from "@/assets/mouse.jpg";
import headset from "@/assets/headset.jpg";
import cpu from "@/assets/cpu.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  image: string;
  category: "GPU" | "CPU" | "Monitor" | "Keyboard" | "Mouse" | "Headset";
  rating: number;
  reviews: number;
  stock: number;
  tag?: string;
  related?: string[];
};

export const products: Product[] = [
  {
    id: "rtx-4090",
    name: "GeForce RTX 4090 Founders Edition",
    brand: "NVIDIA",
    price: 154999,
    mrp: 189999,
    image: gpu,
    category: "GPU",
    rating: 4.9,
    reviews: 1284,
    stock: 7,
    tag: "Best Seller",
    related: ["ryzen-9", "ultrawide-240", "rgb-keyboard"],
  },
  {
    id: "ryzen-9",
    name: "Ryzen 9 7950X3D Processor",
    brand: "AMD",
    price: 56999,
    mrp: 72999,
    image: cpu,
    category: "CPU",
    rating: 4.8,
    reviews: 942,
    stock: 14,
    tag: "Hot Deal",
    related: ["rtx-4090", "ultrawide-240"],
  },
  {
    id: "ultrawide-240",
    name: "34\" UltraWide 240Hz Curved QHD",
    brand: "MDC Pro",
    price: 64999,
    mrp: 89999,
    image: monitor,
    category: "Monitor",
    rating: 4.7,
    reviews: 612,
    stock: 5,
    tag: "Limited",
    related: ["rgb-keyboard", "rgb-mouse"],
  },
  {
    id: "rgb-keyboard",
    name: "Mechanical RGB Keyboard TKL",
    brand: "Phantom",
    price: 8499,
    mrp: 12999,
    image: keyboard,
    category: "Keyboard",
    rating: 4.8,
    reviews: 2310,
    stock: 32,
    related: ["rgb-mouse", "elite-headset"],
  },
  {
    id: "rgb-mouse",
    name: "Pro Wireless RGB Gaming Mouse",
    brand: "Phantom",
    price: 4299,
    mrp: 6499,
    image: mouse,
    category: "Mouse",
    rating: 4.7,
    reviews: 1820,
    stock: 50,
    related: ["rgb-keyboard", "elite-headset"],
  },
  {
    id: "elite-headset",
    name: "Elite 7.1 Surround Headset",
    brand: "Phantom",
    price: 6999,
    mrp: 10999,
    image: headset,
    category: "Headset",
    rating: 4.6,
    reviews: 1045,
    stock: 18,
    related: ["rgb-mouse", "rgb-keyboard"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (id: string) => {
  const p = getProduct(id);
  if (!p?.related) return products.filter((x) => x.id !== id).slice(0, 3);
  return p.related.map(getProduct).filter(Boolean) as Product[];
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
