package com.bc.backend_tienda.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // Clave secreta (mínimo 32 caracteres para HS256)
    private static final String SECRET =
            "supersecretkeysupersecretkeysupersecretkey123!";

    // 24 horas en milisegundos
    private static final long EXPIRATION = 24 * 60 * 60 * 1000;

    // Clave de firma
    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    /**
     * Genera un JWT usando el ID del usuario como subject.
     */
    public static String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extrae el ID del usuario desde el token.
     */
    public static Long getUserId(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        return Long.parseLong(subject);
    }

    /**
     * Valida si el token es correcto y no ha expirado.
     */
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(KEY)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}