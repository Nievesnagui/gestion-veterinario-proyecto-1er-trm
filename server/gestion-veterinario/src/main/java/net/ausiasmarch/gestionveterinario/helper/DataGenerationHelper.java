package net.ausiasmarch.gestionveterinario.helper;

import java.util.Random;

public class DataGenerationHelper {
    private static final String[] aNames = { "Aurora", "Gabriel", "Juan", "Cristina", "María", "Esther", "Esperanza" };
    private static final String[] aSurnames = { "Dominguez", "Aguilar", "Lozano", "Díaz", "Palomero", "Cuesta",
            "Jimenez" };

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

    private static Random random = new Random();

    private static String[] mascota = { "Bollito", "Jaboncillo", "Magdaleno", "Albaricoque", "Michuelo", "Miaumilton" };

    public static String getRadomMascota() {
        return mascota[(int) (Math.random() * mascota.length)];
    }
}
