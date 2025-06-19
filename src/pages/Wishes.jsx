import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react'
import { useState, useEffect } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';

const INITIAL_NOVIOS = [
    {
        id: 1,
        name: "Matías Cárdenas",
        message:
            "Gracias por acompañarnos en este momento tan especial. Sus palabras, oraciones y cariño significan mucho para nosotros. 🎉",
        timestamp: "2025-06-19T23:20:00Z",
        attendance: "asistiré",
    },
    {
        id: 2,
        name: "Karen Medina",
        message:
            "Cada mensaje que nos dejen será un recuerdo que atesoraremos para siempre. Gracias por formar parte de esta historia que estamos comenzando con tanto amor y emoción.",
        timestamp: "2024-12-24T23:20:00Z",
        attendance: "asistiré",
    },
];

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const options = [
        { value: 'asistiré', label: 'Sí, asistiré.' },
        { value: 'no asistiré', label: 'No, no podré asistir.' },
        { value: 'Tal vez', label: 'Tal vez, confirmaré más adelante.' }
    ];


    const [wishes, setWishes] = useState([
        {
            id: 1,
            name: "Matías Cárdenas",
            message:
                "Gracias por acompañarnos en este momento tan especial. Sus palabras, oraciones y cariño significan mucho para nosotros. 🎉",
            timestamp: "2025-06-19T23:20:00Z",
            attendance: "asistiré",
        },
        {
            id: 2,
            name: "Karen Medina",
            message:
                "Cada mensaje que nos dejen será un recuerdo que atesoraremos para siempre. Gracias por formar parte de esta historia que estamos comenzando con tanto amor y emoción.",
            timestamp: "2024-12-24T23:20:00Z",
            attendance: "asistiré",
        },
    ]);

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlUsYzvVQf8LgiPoKtR4w19pqKcQNav4F4ypr4FXQJB9I3N0Y4k7fBwkzW8r_H7ECjXg/exec";

    // 1) Al montar, traemos del sheet y guardamos:
    useEffect(() => {
        fetch(SCRIPT_URL)
            .then(res => res.json())
            .then(sheetWishes => {
                setWishes([...INITIAL_NOVIOS, ...sheetWishes]);
            })
            .catch(err => console.error("No pude cargar los deseos:", err));
    }, []);

    const handleSubmitWish = (e) => {
        e.preventDefault();
        if (!newWish.trim() || !name || !attendance) return;

        setIsSubmitting(true);

        // 1) Creamos dinámicamente un <form>
        const form = document.createElement('form');
        form.style.display = 'none';
        form.method = 'POST';
        form.action = SCRIPT_URL;
        form.target = 'hidden_iframe';

        // construimos todos los campos
        ;['name', 'attendance', 'message'].forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            // valor según la key
            if (key === 'name') input.value = name;
            if (key === 'attendance') input.value = attendance;
            if (key === 'message') input.value = newWish;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();                          // 3) Enviamos
        document.body.removeChild(form);

        // mantenemos tu lógica de estado local
        setWishes(prev => [
            { id: prev.length + 1, name, attendance, message: newWish, timestamp: new Date().toISOString() },
            ...prev
        ]);
        setName('');
        setAttendance('');
        setNewWish('');
        setIsOpen(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setIsSubmitting(false);
    };

    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'asistiré':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'no asistiré':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'Tal vez':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };
    return (<>
        <iframe
            name="hidden_iframe"
            style={{ display: 'none' }}
        />
        <section id="wishes" className="min-h-screen relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Comparte con nosotros tus oraciones y mejores deseos.
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Mensajes y Oraciones
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <AnimatePresence>
                        <Marquee speed={20}
                            gradient={false}
                            className="[--duration:20s] py-2">
                            {wishes.map((wish, index) => (
                                <motion.div
                                    key={wish.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative w-[280px]"
                                >
                                    {/* Background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                                    {/* Card content */}
                                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                                        {/* Header */}
                                        <div className="flex items-start space-x-3 mb-2">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                                    {wish.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Name, Time, and Attendance */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium text-gray-800 text-sm truncate">
                                                        {wish.name}
                                                    </h4>
                                                    {getAttendanceIcon(wish.attendance)}
                                                </div>
                                                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                    <Clock className="w-3 h-3" />
                                                    <time className="truncate">
                                                        {formatEventDate(wish.timestamp)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">
                                            {wish.message}
                                        </p>

                                        {/* Optional: Time indicator for recent messages */}
                                        {Date.now() - new Date(wish.timestamp).getTime() < 3600000 && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                                                    New
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Marquee>
                    </AnimatePresence>
                </div>
                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                            <div className='space-y-2'>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <User className="w-4 h-4" />
                                        <span>Tu Nombre</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Tu Nombre..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-2 relative"
                                >
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>¿Asistirás?</span>
                                    </div>

                                    {/* Custom Select Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                    >
                                        <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                                            {attendance ?
                                                options.find(opt => opt.value === attendance)?.label
                                                : 'Selecciona tu asistencia...'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Options */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                            >
                                                {options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setAttendance(option.value);
                                                            setIsOpen(false);
                                                        }}
                                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                        className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${attendance === option.value
                                                                ? 'bg-rose-50 text-rose-600'
                                                                : 'text-gray-700 hover:bg-rose-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                {/* Wish Textarea */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Tus deseos</span>
                                    </div>
                                    <textarea
                                        placeholder="✨ Envía tus deseos y oraciones para los novios..."
                                        className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                                        value={newWish}
                                        onChange={(e) => setNewWish(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Envía tu deseo</span>
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                                        ${isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Enviando...' : 'Compartir mensaje'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    </>)
}
