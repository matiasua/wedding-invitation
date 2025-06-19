import config from "@/config/config";
import { Clock, Navigation as NavigationIcon, MapPin, CalendarCheck, Phone, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
    return (<>
        {/* Location section */}
        <section id="location" className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Ubicación del Evento
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Nos vemos aquí
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MapPin className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Location Content */}
                <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-8 items-center">
                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
                    >
                        <iframe
                            src={config.data.maps_embed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </motion.div>

                    {/* Venue Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                    </motion.div>
                </div>
            </div>
        </section>
    </>)
}