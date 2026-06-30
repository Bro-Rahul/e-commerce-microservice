import { PhoneValidatorSchema } from '@/validators/addProduct'
import Specifications from './Specifications'
import AttributeRenderer from './AttributeRenderer'
import ProductDisplayImage from './ProductDisplayImage';
import { useEffect, useState } from 'react';
import { getImagesByCategory } from '@/lib/imageService';


interface PhoneRendererProps {
    phoneData: PhoneValidatorSchema,
    // productDisplayImages : ProductDisplayImageSchema
}

const PhoneRenderer = ({ phoneData }: PhoneRendererProps) => {

    const { title, price, description, about, ...rest } = phoneData;

    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const getImages = async () => {
            const response = await getImagesByCategory("Phones");
            const imageData = response.map(image => {
                const imageMetaData = {
                    id: image.id,
                    file: URL.createObjectURL(image.file),
                    isCoverImage: image.isCoverImage,
                    name: image.name
                }
                return imageMetaData;
            });

            setImages(imageData);
        }

        getImages();
    }, []);
    return (
        <main className="max-w-7xl mx-auto px-4 py-6">

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">


                <ProductDisplayImage productImages={images} />

                <div className="lg:col-span-4 space-y-4">
                    <div>
                        <h2 className="text-2xl font-medium leading-tight">{phoneData.title}</h2>
                        <p className="text-blue-600 text-sm mt-1 font-medium">Brand: {phoneData.brand}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-orange-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>

                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                            </div>
                            <span className="text-blue-600 text-sm">(143)</span>
                        </div>
                        <div className="inline-block bg-black text-white text-[10px] px-2 py-0.5 mt-2 rounded-sm">Amazon's Choice</div>
                        <p className="text-xs text-gray-600 mt-1">50+ bought in past month</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-red-500 text-3xl font-light">-13%</span>
                            <span className="text-3xl font-medium">₹{new Intl.NumberFormat().format(phoneData.price)}</span>
                        </div>
                        <p className="text-xs text-gray-500">M.R.P.: <span className="line-through">₹24,999</span></p>
                        <p className="text-sm font-medium mt-1">Inclusive of all taxes</p>
                        <p className="text-sm mt-1">EMI starts at ₹769. No Cost EMI available <a className="text-blue-600" href="#">EMI
                            options</a></p>
                    </div>

                    <div data-purpose="offers">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            <span className="font-bold text-sm">Offers</span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            <div className="offer-card flex flex-col justify-between">
                                <p className="text-xs font-bold">Cashback</p>
                                <p className="text-[11px] text-gray-600 mt-1">Upto ₹655.00 cashback as Amazon Pay Balance when...</p>
                                <a className="text-blue-600 text-[11px] mt-2 block" href="#">1 offer &gt;</a>
                            </div>
                            <div className="offer-card flex flex-col justify-between">
                                <p className="text-xs font-bold">No Cost EMI</p>
                                <p className="text-[11px] text-gray-600 mt-1">Upto ₹569.95 EMI interest savings on Amazon Pay ICICI...</p>
                                <a className="text-blue-600 text-[11px] mt-2 block" href="#">1 offer &gt;</a>
                            </div>
                            <div className="offer-card flex flex-col justify-between">
                                <p className="text-xs font-bold">Bank Offer</p>
                                <p className="text-[11px] text-gray-600 mt-1">Upto ₹1,093 discount on Bank Credit...</p>
                                <a className="text-blue-600 text-[11px] mt-2 block" href="#">1 offer &gt;</a>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 border-y border-gray-100 py-4 text-center">
                        <div className="space-y-1">
                            <div className="flex justify-center"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg></div>
                            <p className="text-[10px] text-blue-600 leading-tight">10 days Service Centre Replacement</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-center"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg></div>
                            <p className="text-[10px] text-blue-600 leading-tight">Free Delivery</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-center"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg></div>
                            <p className="text-[10px] text-blue-600 leading-tight">1 Year Warranty</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-center"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg></div>
                            <p className="text-[10px] text-blue-600 leading-tight">Pay on Delivery</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="text-xs font-bold mb-3">Set name: <span className="font-normal">Poco M8 5G (Frost Silver, 8GB RAM),
                            (128GB ROM)</span></p>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="variant-chip active">
                                <p className="font-bold">Poco M8 5G (Frost Sil...</p>
                                <p className="text-gray-500">₹21,863.00</p>
                                <p className="text-gray-400 line-through">₹24,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Carbon...</p>
                                <p className="text-gray-500">₹21,860.00</p>
                                <p className="text-gray-400 line-through">₹24,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Carbon...</p>
                                <p className="text-gray-500">₹23,970.00</p>
                                <p className="text-gray-400 line-through">₹29,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Carbon...</p>
                                <p className="text-gray-500">₹19,990.00</p>
                                <p className="text-gray-400 line-through">₹21,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Frost Sil...</p>
                                <p className="text-gray-500">₹20,270.00</p>
                                <p className="text-gray-400 line-through">₹23,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Glacial...</p>
                                <p className="text-gray-500">₹20,290.00</p>
                                <p className="text-gray-400 line-through">₹21,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Glacial...</p>
                                <p className="text-gray-500">₹21,949.00</p>
                                <p className="text-gray-400 line-through">₹27,999.00</p>
                            </div>
                            <div className="variant-chip">
                                <p className="font-bold">Poco M8 5G (Frost Sil...</p>
                                <p className="text-gray-500">₹23,725.00</p>
                                <p className="text-gray-400 line-through">₹24,999.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold mb-3">About this item</h3>
                        <AttributeRenderer attributes={Object.entries(rest)} />
                        <a className="text-blue-600 text-xs mt-3 inline-block hover:underline" href="#">See more product details</a>
                        <div className="mt-6 flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            <span className="text-xs font-medium">Report an issue with this product</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="buy-box space-y-4">
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-blue-700 font-bold text-lg italic">prime</span>
                            </div>
                            <p className="text-xs">Enjoy <b>Unlimited FREE Same day/1-day delivery</b>, Prime offers everyday and more</p>
                            <a className="text-blue-600 text-xs font-medium mt-2 inline-block" href="#">Join Prime &gt;&gt;</a>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 p-2 border rounded border-gray-200 cursor-pointer">
                                <input className="mt-1" name="purchase-type" type="radio" />
                                <div>
                                    <span className="text-sm font-bold block">With Exchange</span>
                                    <span className="text-xs text-red-600">Up to ₹ 20,750.00 off</span>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-2 border rounded border-blue-600 bg-blue-50 cursor-pointer">
                                <input className="mt-1 text-blue-600" name="purchase-type" type="radio" />
                                <div>
                                    <span className="text-sm font-bold block">Without Exchange</span>
                                    <span className="text-sm text-red-600 font-bold">₹ 21,863.00</span>
                                    <span className="text-xs text-gray-400 line-through ml-1">₹ 24,999.00</span>
                                </div>
                            </label>
                        </div>
                        <div className="text-xs space-y-1">
                            <p>FREE delivery <b>Friday, 3 July</b>.</p>
                            <p>Order within <span className="text-green-700">10 hrs 36 mins.</span> <a className="text-blue-600"
                                href="#">Details</a></p>
                            <p className="flex items-center gap-1 mt-2 text-blue-600">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"></path>
                                </svg>
                                Delivering to Mumbai 400017 - Update location
                            </p>
                        </div>
                        <div className="text-green-700 font-bold text-lg">In stock</div>
                        <div className="space-y-3">
                            <select className="w-full border-gray-300 rounded-md text-sm py-1.5 focus:ring-blue-500 focus:border-blue-500">
                                <option>Quantity: 1</option>
                                <option>Quantity: 2</option>
                            </select>
                            <button
                                className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full text-sm font-medium transition-colors">Add
                                to cart</button>
                            <button
                                className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded-full text-sm font-medium transition-colors">Buy
                                Now</button>
                        </div>
                        <div className="text-[11px] text-gray-600 grid grid-cols-2 gap-y-1 border-t border-gray-100 pt-3">
                            <span>Ships from</span> <span className="text-gray-900">Amazon</span>
                            <span>Sold by</span> <span className="text-blue-600">Vardhman_Tele.</span>
                            <span>Payment</span> <span className="text-blue-600">Secure transaction</span>
                            <span>Gift options</span> <span className="text-blue-600">Available at checkout</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                            <p className="text-sm font-bold">Add a Protection Plan:</p>
                            <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                <input className="rounded text-blue-600" type="checkbox" />
                                <span className="text-xs"><span className="text-blue-600">1 Year Extended Warranty</span> by OneAssist for <span
                                    className="text-red-700 font-bold">₹649.00</span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <Specifications
                specifications={[{
                    name: "Display",
                    specification: {
                        size: "6.3-inch",
                        type: "Super Retina XDR OLED",
                        resolution: "2622 × 1206",
                        refreshRate: "120Hz",
                        brightness: "2000 nits",
                    }
                },
                {
                    name: "camera",
                    specification: {
                        rear: "48MP + 48MP + 12MP",
                        front: "12MP",
                        zoom: "5x Optical Zoom",
                        flash: "True Tone Flash",
                    }
                },
                {
                    name: "video",
                    specification: {
                        recording: "4K at 60fps",
                        hdr: "Dolby Vision HDR",
                        slowMotion: "1080p at 240fps",
                        cinematic: "4K at 30fps",
                    }
                },
                {
                    name: "connectivity",
                    specification: {
                        network: "5G",
                        wifi: "Wi-Fi 7",
                        bluetooth: "5.3",
                        nfc: "Yes",
                        usb: "USB-C",
                        gps: "GPS, GLONASS, Galileo",
                    },
                }
                ]}
            />


            <section className="border-t border-gray-300 mt-12 pt-8">
                <h3 className="text-lg font-bold mb-4">Product description</h3>
                <p className="text-sm text-gray-800">{phoneData.description}</p>
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase">Top Brand</span>
                        <span className="text-xl font-bold italic tracking-tight">POCO</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700">86% positive ratings from 50K+ customers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700">50K+ recent orders from this brand</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700">7+ years on ShopDirect</span>
                        </div>
                    </div>
                </div>
            </section>


            <section className="border-t border-gray-300 mt-12 pt-8 mb-20">
                <h3 className="text-lg font-bold mb-4">What is in the box?</h3>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 ml-1">
                    <li>Charger, cable, SIM eject tool, Warranty card, User guide, Protective case</li>
                </ul>
            </section>


        </main>
    )
}

export default PhoneRenderer