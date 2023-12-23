import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';
import { ListItem } from './components/ListItem';

const Elements = Array.from({ length: 100 }).map((_, index) => index);

function App() {
    const [showList, setShowList] = useState(false);
    const [visibleItems, setVisibleItems] = useState(10);
    const listRef = useRef(null);
    const optionsRef = useRef({
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    });

    const handleShowList = () => {
        setShowList(!showList);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Когда последний элемент становится видимым, увеличиваем количество видимых элементов
                        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
                    }
                });
            },
            optionsRef.current // Используйте optionsRef.current здесь
        );

        if (listRef.current) {
            listRef.current.forEach((element) => {
                observer.observe(element);
            });
        }

        return () => {
            if (listRef.current) {
                listRef.current.forEach((element) => {
                    observer.unobserve(element);
                });
            }
        };
    }, [listRef.current, optionsRef.current]); // Зависимости включают listRef.current и optionsRef.current

    return (
        <div className={styles.layout}>
            <button onClick={handleShowList}>
                {!showList ? 'Показать' : 'Скрыть'} список
            </button>

            {showList && (
                <div ref={(ref) => (listRef.current = ref)}>
                    {Elements.slice(0, visibleItems).map((item) => (
                        <ListItem key={item} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
