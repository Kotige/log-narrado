import { Link } from 'react-router-dom';
import Header  from '../components/Header'
import Hero from '../components/Hero';

export default function Home() {
    return (
        <div>
            <Header />
            <section className="flex w-full h-[calc(100vh-83px)] items-center flex-col md:flex-row">
                <div className="w-full md:w-2/3"><Hero /></div>
                <div className="hidden md:block md:w-1/3"></div>
            </section>
        </div>
    );
}