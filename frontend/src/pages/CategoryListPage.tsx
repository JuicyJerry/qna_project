import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/quiz";

const CategoryListPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleCategoryClick = (categoryId: string) => {
        console.log("handleCategoryClick[categoryId] ---> ", categoryId);

        navigate(`/quiz/${categoryId}`, { state: { categoryName: categoryId } });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                console.log("fetchCategories[data] ---> ", data);
                setCategories(data.categories);
            } catch (err) {
                setError("퀴즈 카테고리를 불러오지 못 했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🧩 퀴즈 카테고리를 선택하세요</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full">
                {categories.map((category) => (
                    <li key={category.id}>
                        <button onClick={() => handleCategoryClick(category.id)} className="w-full py-4 px-6 bg-white rounded-xl shadow-md text-lg font-semibold hover:bg-blue-50 transition-all">
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryListPage;
