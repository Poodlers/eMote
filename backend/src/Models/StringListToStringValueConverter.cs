using System.Linq;

using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

public class StringListToStringValueConverter : ValueConverter<ICollection<string>, string>
{
    public StringListToStringValueConverter() : base(le => ListToString(le), (s => StringToList(s)))
    {

    }
    public static string ListToString(ICollection<string> value)
    {
        if (value == null || value.Count() == 0)
        {
            return null;
        }

        return value.Aggregate((i, j) => i + ',' + j);
    }

    public static ICollection<string> StringToList(string value)
    {
        if (value == null || value == string.Empty)
        {
            return null;
        }

        return value.Split(',');

    }
}