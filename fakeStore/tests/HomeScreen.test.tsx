import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HomeScreen from "@/app/(tabs)";


const mock = new MockAdapter(axios);

describe("HomeScreen Tests", () => {
    beforeEach(() => {
        mock.reset();
    });

    it("muestra productos correctamente", async () => {
        const mockProducts = [
            { id: 1, title: "Producto 1", price: 10, image: "http://example.com/1.jpg" },
            { id: 2, title: "Producto 2", price: 20, image: "http://example.com/2.jpg" },
        ];

        mock.onGet("/products?sort=desc").reply(200, mockProducts);

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        // Barra de búsqueda presente
        expect(getByPlaceholderText("Buscar productos...")).toBeTruthy();

        // Espera a que los productos se rendericen
        await waitFor(() => getByText("Producto 1"));

        expect(getByText("Producto 1")).toBeTruthy();
        expect(getByText("$10.00")).toBeTruthy();
        expect(getByText("Producto 2")).toBeTruthy();
        expect(getByText("$20.00")).toBeTruthy();
    });

    it("maneja error 401 correctamente", async () => {
        mock.onGet("/products?sort=desc").reply(401);

        const { getByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(getByText("Sesión Expirada")).toBeTruthy();
        });
    });
});
