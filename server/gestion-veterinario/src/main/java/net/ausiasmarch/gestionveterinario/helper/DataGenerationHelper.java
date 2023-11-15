package net.ausiasmarch.gestionveterinario.helper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class DataGenerationHelper {
    private static final String[] aNames = { "Aurora", "Gabriel", "Juan", "Cristina", "María", "Esther", "Esperanza" };
    private static final String[] aSurnames = { "Dominguez", "Aguilar", "Lozano", "Díaz", "Palomero", "Cuesta",
            "Jimenez" };


    public static int getRandomInt(int min, int max) {
        Random rand = new Random();
        int randomNum = rand.nextInt((max - min) + 1) + min;
        return randomNum;
    }
    public static String getRadomName() {
        return aNames[(int) (Math.random() * aNames.length)];
    }

    public static String getRadomSurname() {
        return aSurnames[(int) (Math.random() * aSurnames.length)];
    }

    public static String doNormalizeString(String cadena) {
        String original = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        String cadenaSinAcentos = cadena;
        for (int i = 0; i < original.length(); i++) {
            cadenaSinAcentos = cadenaSinAcentos.replace(original.charAt(i), ascii.charAt(i));
        }
        return cadenaSinAcentos;
    }

    private static String[] mascota = { "Bollito", "Jaboncillo", "Magdaleno", "Albaricoque", "Michuelo", "Miaumilton" };

    public static String getRadomMascota() {
        return mascota[(int) (Math.random() * mascota.length)];
    }

    public static LocalDateTime getRadomDate() {
        long minDay = LocalDate.of(2020, 1, 1).toEpochDay();
        long maxDay = LocalDate.of(2023, 10, 31).toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
        return LocalDate.ofEpochDay(randomDay).atStartOfDay()
                .plusHours(getRandomInt(0, 23))
                .plusMinutes(getRandomInt(0, 59))
                .plusSeconds(getRandomInt(0, 59));
    }
    
}
